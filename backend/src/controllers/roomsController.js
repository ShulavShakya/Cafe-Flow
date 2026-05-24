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

export const occupyRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { guest_name, phone, guest_count } = req.body;

    if (!guest_name) {
      return res.status(400).json({
        message: "guest_name are required",
      });
    }

    const room = await prisma.room.findUnique({
      where: { room_id: Number(id) },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.status !== "Available") {
      return res.status(400).json({
        message: `Room is currently ${room.status} and cannot be occupied`,
      });
    }

    if (room.capacity < Number(guest_count)) {
      return res.status(400).json({
        message: `Room capacity (${room.capacity}) is less than guest count (${guest_count})`,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Reuse guest if phone matches, otherwise create new
      let guest = phone
        ? await tx.guest.findUnique({ where: { phone } })
        : null;

      if (!guest) {
        guest = await tx.guest.create({
          data: {
            full_name: guest_name,
            phone: phone || null,
          },
        });
      }

      const now = new Date();
      const reservation = await tx.roomReservation.create({
        data: {
          guest_count: Number(guest_count),
          check_in_date: now,
          check_in_time: now,
          status: "checked_in", // walk-in is checked in immediately
          type: "walk_in",
          guest: { connect: { guest_id: guest.guest_id } },
          room: { connect: { room_id: Number(id) } },
        },
        include: { guest: true, room: true },
      });

      await tx.room.update({
        where: { room_id: Number(id) },
        data: { status: "Occupied" },
      });

      return reservation;
    });

    return res.status(200).json({
      message: "Room occupied successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
