// src/controllers/staff.controller.js
import { prisma } from "../utils/prisma.js";
import bcrypt from "bcryptjs";

export const addStaff = async (req, res, next) => {
  try {
    const { full_name, email, password, phone, role_name, address } = req.body;

    if (!full_name || !email || !password) {
      return res
        .status(400)
        .json({ message: "full_name, email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const role = await prisma.role.findUnique({
      where: { role_name: role_name || "staff" },
    });
    if (!role) {
      return res
        .status(400)
        .json({ message: `Role '${role_name}' does not exist` });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const staffCount = await prisma.user.count();
    if (staffCount >= 50) {
      return res
        .status(400)
        .json({ message: "Staff limit reached. Cannot add more." });
    }

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password: hashedPass,
        phone: phone || null,
        status: "active",
        salary: 0,
        address: address || null,
        role: {
          connect: { role_name: role.role_name },
        },
      },
      select: {
        user_id: true,
        full_name: true,
        email: true,
        phone: true,
        status: true,
        salary: true,
        address: true,
        created_at: true,
        role: {
          select: { role_name: true },
        },
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// GET /staff  — list all staff with their role
export const getStaff = async (req, res, next) => {
  try {
    console.log("HIT");
    const staff = await prisma.user.findMany({
      select: {
        user_id: true,
        full_name: true,
        email: true,
        phone: true,
        status: true,
        salary: true,
        address: true,
        created_at: true,
        role: {
          select: { role_name: true },
        },
      },
      orderBy: { created_at: "asc" },
    });

    return res.status(200).json({ data: staff });
  } catch (error) {
    next(error);
  }
};

// PATCH /staff/:id  — update salary (and optionally other fields)
export const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { salary, phone, address, status } = req.body;

    // Build only the fields that were actually sent
    const data = {};
    if (salary !== undefined) {
      if (Number(salary) <= 0) {
        return res
          .status(400)
          .json({ message: "Salary must be a positive number" });
      }
      data.salary = Number(salary);
    }
    if (phone !== undefined) data.phone = phone;
    if (address !== undefined) data.address = address;
    if (status !== undefined) data.status = status;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    const updated = await prisma.user.update({
      where: { user_id: id },
      data,
      select: {
        user_id: true,
        full_name: true,
        email: true,
        phone: true,
        status: true,
        salary: true,
        address: true,
        role: { select: { role_name: true } },
      },
    });

    return res.status(200).json({
      message: "Staff updated successfully",
      data: updated,
    });
  } catch (error) {
    // Prisma throws P2025 when the record doesn't exist
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Staff member not found" });
    }
    next(error);
  }
};

// DELETE /staff/:id
export const deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({ where: { user_id: Number(id) } });

    return res
      .status(200)
      .json({ message: "Staff member removed successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Staff member not found" });
    }
    next(error);
  }
};

export const updateSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { salary } = req.body;

    const updatedStaff = await prisma.user.update({
      where: {
        user_id: Number(id),
      },
      data: {
        salary,
      },
    });

    res.status(200).json({
      success: true,
      message: "Salary updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update salary",
    });
  }
};
