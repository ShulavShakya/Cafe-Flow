import express from "express";
import {
  assignRoom,
  getAllReservations,
  deleteRoomReservation,
  createRoomReservation,
} from "../controllers/roomReservationController.js";

import {
  authenticateToken,
  checkRole,
} from "../middlewares/auth.Middleware.js";

const roomReservationRouter = express.Router();

roomReservationRouter.post(
  "/:id/create",
  authenticateToken,
  checkRole("admin", "reception", "manager"),
  createRoomReservation,
);
roomReservationRouter.get(
  "/",
  authenticateToken,
  checkRole("admin", "reception", "manager"),
  getAllReservations,
);
roomReservationRouter.delete(
  "/:id",
  authenticateToken,
  checkRole("admin", "reception", "manager"),
  deleteRoomReservation,
);
roomReservationRouter.patch(
  "/:id/assign",
  authenticateToken,
  checkRole("admin", "reception", "manager"),
  assignRoom,
);
export default roomReservationRouter;
