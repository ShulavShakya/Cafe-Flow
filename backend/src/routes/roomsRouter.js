import router from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  occupyRoom,
} from "../controllers/roomsController.js";
import {
  authenticateToken,
  checkRole,
} from "../middlewares/auth.Middleware.js";

const roomRouter = router.Router();

roomRouter.post("/", authenticateToken, createRoom);
roomRouter.get("/", authenticateToken, getAllRooms);
roomRouter.get("/:id", authenticateToken, getRoomById);
roomRouter.put("/:id", authenticateToken, updateRoom);
roomRouter.delete("/:id", authenticateToken, deleteRoom);
roomRouter.patch("/:id/occupy", authenticateToken, occupyRoom);

export default roomRouter;
