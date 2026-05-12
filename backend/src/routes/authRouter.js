import router from "express";
import { login, logout } from "../controllers/authController.js";

const authRouter = router.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
