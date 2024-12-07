import express, { Router } from "express";
export const router = Router();
import { router as userRouter } from "./user.js"

router.use("/users", userRouter)



