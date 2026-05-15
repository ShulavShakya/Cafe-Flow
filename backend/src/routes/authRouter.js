import router from "express";
import {
  login,
  logout,
  verifyMe,
  refreshToken,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.Middleware.js";

const authRouter = router.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticateToken, verifyMe);
authRouter.post("/refresh", authenticateToken, refreshToken);

export default authRouter;
