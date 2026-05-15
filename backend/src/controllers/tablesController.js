// src/controllers/table.controller.js
import { prisma } from "../utils/prisma.js";

const VALID_STATUSES = ["Available", "Occupied", "Reserved"];

// ─── Create Table ─────────────────────────────────────────────────────────────
export const createTable = async (req, res, next) => {
  try {
    const { table_number, capacity, status } = req.body;

    if (!table_number) {
      return res.status(400).json({ message: "table_number is required" });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const existing = await prisma.table.findUnique({ where: { table_number } });
    if (existing) {
      return res
        .status(409)
        .json({ message: `Table '${table_number}' already exists` });
    }

    const table = await prisma.table.create({
      data: {
        table_number,
        capacity: capacity ? Number(capacity) : 2,
        status: status || "Available",
      },
    });

    return res.status(201).json({
      message: "Table created successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get All Tables ───────────────────────────────────────────────────────────
export const getAllTables = async (req, res, next) => {
  try {
    const { status } = req.query;

    const filters = {};
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
        });
      }
      filters.status = status;
    }

    const tables = await prisma.table.findMany({
      where: filters,
      orderBy: { table_number: "asc" },
    });

    if (tables.length === 0) {
      return res.status(200).json({
        message: "No tables found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Tables fetched successfully",
      data: tables,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get Table By ID ──────────────────────────────────────────────────────────
export const getTableById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const table = await prisma.table.findUnique({
      where: { table_id: Number(id) },
      include: {
        food_orders: true,
        billings: true,
      },
    });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    return res.status(200).json({
      message: "Table fetched successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Update Table ─────────────────────────────────────────────────────────────
export const updateTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { table_number, capacity, status } = req.body;

    const existing = await prisma.table.findUnique({
      where: { table_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    if (table_number && table_number !== existing.table_number) {
      const duplicate = await prisma.table.findUnique({
        where: { table_number },
      });
      if (duplicate) {
        return res
          .status(409)
          .json({ message: `Table number '${table_number}' already in use` });
      }
    }

    const table = await prisma.table.update({
      where: { table_id: Number(id) },
      data: {
        table_number: table_number ?? existing.table_number,
        capacity: capacity ? Number(capacity) : existing.capacity,
        status: status ?? existing.status,
      },
    });

    return res.status(200).json({
      message: "Table updated successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Delete Table ─────────────────────────────────────────────────────────────
export const deleteTable = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.table.findUnique({
      where: { table_id: Number(id) },
      include: {
        food_orders: true,
        billings: true,
      },
    });

    if (!existing) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (existing.food_orders.length > 0 || existing.billings.length > 0) {
      return res.status(400).json({
        message:
          "Cannot delete table linked to existing food orders or billings.",
      });
    }

    await prisma.table.delete({ where: { table_id: Number(id) } });

    return res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    next(error);
  }
};
