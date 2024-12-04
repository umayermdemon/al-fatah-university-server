import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

// create a user
router.post("/create-user", userControllers.createUser);
// get all user
router.get("/", userControllers.getAllUser);

export const userRouter = router;
