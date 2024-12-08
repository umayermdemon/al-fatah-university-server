import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zStudentValidations } from "../student/student.validation";

const router = Router();

// create a user
router.post(
  "/create-user",
  validateRequest(zStudentValidations.zCreateStudent),
  userControllers.createStudent,
);

export const userRouter = router;
