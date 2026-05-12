import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import rolesRouter from "./rolesRoute.js";
import guestRouter from "./guestsRouter.js";
import roomRouter from "./roomsRouter.js";
import menuCategoriesRouter from "./menuCategoriesRouter.js";
import menuItemRouter from "./menuItemsRouter.js";
import tablesRouter from "./tablesRouter.js";
import foodOrdersRouter from "./foodOrdersRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/staff", userRouter);
router.use("/roles", rolesRouter);
router.use("/guests", guestRouter);
router.use("/rooms", roomRouter);
router.use("/categories", menuCategoriesRouter);
router.use("/menu-items", menuItemRouter);
router.use("/tables", tablesRouter);
router.use("/food-orders", foodOrdersRouter);

export default router;
