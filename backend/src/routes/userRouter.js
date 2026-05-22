import { addStaff } from "../controllers/userController.js";
import { getStaff } from "../controllers/userController.js";
import { deleteStaff } from "../controllers/userController.js";
import { updateStaff } from "../controllers/userController.js";
import { updateSalary } from "../controllers/userController.js";

import express from "express";
import {
  authenticateToken,
  checkRole,
} from "../middlewares/auth.Middleware.js";

const router = express.Router();

router.post(
  "/add-staff",
  [authenticateToken, checkRole("admin", "manager")],
  addStaff,
);
router.get(
  "/get-staff",
  [authenticateToken, checkRole("admin", "manager")],
  getStaff,
);
router.delete(
  "/delete-staff/:id",
  [authenticateToken, checkRole("admin", "manager")],
  deleteStaff,
);
router.put(
  "/update-salary/:id",
  [authenticateToken, checkRole("admin", "manager")],
  updateSalary,
);
router.put(
  "/update-staff/:id",
  [authenticateToken, checkRole("admin", "manager")],
  updateStaff,
);

export default router;
