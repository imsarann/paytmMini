import express, { Router } from "express";
export const router = Router();
import { router as userRouter } from "./user.js"
import { router as accoutRouter} from "./account.js";
router.use("/users", userRouter)
router.use("/account", accoutRouter)



