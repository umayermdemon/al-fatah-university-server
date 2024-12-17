import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zStudentValidations } from "../student/student.validation";
import { zFacultyValidations } from "../faculty/faculty.validation";

const router = Router();

// create a user
router.post(
  "/create-student",
  validateRequest(zStudentValidations.zCreateStudent),
  userControllers.createStudent,
);
// create a faculty
router.post(
  "/create-faculty",
  validateRequest(zFacultyValidations.zCreateFaculty),
  userControllers.createFaculty,
);

export const userRouter = router;
