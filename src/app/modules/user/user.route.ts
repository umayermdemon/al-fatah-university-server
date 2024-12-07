import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

// create a user
router.post("/create-user", userControllers.createStudent);

export const userRouter = router;
