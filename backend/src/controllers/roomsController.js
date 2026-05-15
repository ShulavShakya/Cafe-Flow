// src/controllers/room.controller.js
import { prisma } from "../utils/prisma.js";

const VALID_STATUSES = ["Available", "Occupied", "Cleaning", "Reserved"];

// ─── Create Room ─────────────────────────────────────────────────────────────
export const createRoom = async (req, res, next) => {
  try {
    const { room_number, category, capacity, price_per_night, status } =
      req.body;

    if (!room_number || !price_per_night) {
      return res
        .status(400)
        .json({ message: "room_number and price_per_night are required" });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const existing = await prisma.room.findUnique({ where: { room_number } });
    if (existing) {
      return res
        .status(409)
        .json({ message: `Room '${room_number}' already exists` });
    }

    const room = await prisma.room.create({
      data: {
        room_number,
        category: category || null,
        capacity: capacity || null,
        price_per_night: Number(price_per_night),
        status: status || "Available",
      },
    });

    return res.status(201).json({
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get All Rooms ───────────────────────────────────────────────────────────
export const getAllRooms = async (req, res, next) => {
  try {
    const { status, category, capacity } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (category) filters.category = category;
    if (capacity) filters.capacity = Number(capacity);

    const rooms = await prisma.room.findMany({
      where: filters,
      orderBy: { room_number: "asc" },
    });

    if (rooms.length === 0) {
      return res.status(200).json({
        message: "No rooms found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Rooms fetched successfully",
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get Room By ID ──────────────────────────────────────────────────────────
export const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const room = await prisma.room.findUnique({
      where: { room_id: Number(id) },
      include: { stays: true },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({
      message: "Room fetched successfully",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Update Room ─────────────────────────────────────────────────────────────
export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { room_number, category, capacity, price_per_night, status } =
      req.body;

    const existing = await prisma.room.findUnique({
      where: { room_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    // If room_number is changing, check it's not taken by another room
    if (room_number && room_number !== existing.room_number) {
      const duplicate = await prisma.room.findUnique({
        where: { room_number },
      });
      if (duplicate) {
        return res
          .status(409)
          .json({ message: `Room number '${room_number}' already in use` });
      }
    }

    const room = await prisma.room.update({
      where: { room_id: Number(id) },
      data: {
        room_number: room_number ?? existing.room_number,
        category: category ?? existing.category,
        capacity: capacity ?? existing.capacity,
        price_per_night: price_per_night
          ? Number(price_per_night)
          : existing.price_per_night,
        status: status ?? existing.status,
      },
    });

    return res.status(200).json({
      message: "Room updated successfully",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Delete Room ─────────────────────────────────────────────────────────────
export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.room.findUnique({
      where: { room_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Room not found" });
    }

    await prisma.room.delete({ where: { room_id: Number(id) } });

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    next(error);
  }
};
