// src/controllers/auth.controller.js
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";

export const login = async (req, res, next) => {
  console.log("LOGIN CONTROLLER HIT");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: { select: { role_name: true } },
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.status !== "active") {
      return res
        .status(403)
        .json({ message: "Account is inactive. Contact admin." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // if (user.must_change_password) {
    //   return res.status(200).json({
    //     message: "Password change required",
    //     data: {
    //       userId: user.user_id,
    //       email: user.email,
    //       role_name: user.role.role_name,
    //     },
    //   });
    // }

    const payload = {
      user_id: user.user_id,
      email: user.email,
      role_name: user.role.role_name,
    };

    const accessToken = jwt.sign(payload, process.env.KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
      expiresIn: process.env.REFRESH_EXPIRES_IN || "7d",
    });

    await prisma.user.update({
      where: { user_id: user.user_id },
      data: {
        refresh_token: refreshToken,
      },
    });

    console.log("Login success - setting cookies");

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, refresh_token, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login successful",
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { user_id, new_password } = req.body;

    const hashed = await bcrypt.hash(new_password, 10);

    await prisma.user.update({
      where: { user_id },
      data: {
        password: hashed,
        must_change_password: false,
        temp_password: false,
      },
    });

    return res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refresh_token;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_KEY);

    const user = await prisma.user.findUnique({
      where: { user_id: decoded.user_id },
    });

    if (!user || user.refresh_token !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      {
        user_id: user.user_id,
        role: decoded.role,
        email: decoded.email,
      },
      process.env.KEY,
      { expiresIn: "15m" },
    );

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Token refreshed" });
  } catch (err) {
    return res.status(403).json({ message: "Refresh failed" });
  }
};
