import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login to continue",
      });
    }

    const decoded = jwt.verify(token, process.env.KEY);

    const user = await prisma.user.findUnique({
      where: {
        user_id: decoded.user_id,
      },
      select: {
        user_id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }
};

export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role.role_name)) {
      return res.status(403).json({
        status: false,
        message: "Access denied",
      });
    }

    next();
  };
};
