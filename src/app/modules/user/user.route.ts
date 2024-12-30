import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "../student/student.validation";
import { FacultyValidations } from "../faculty/faculty.validation";
import { AdminValidations } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { userRole } from "../Auth/auth.const";

const router = Router();

// create a user
router.post(
  "/create-student",
  auth(userRole.Admin),
  validateRequest(StudentValidations.CreateStudent),
  userControllers.createStudent,
);
// create a faculty
router.post(
  "/create-faculty",
  validateRequest(FacultyValidations.CreateFaculty),
  userControllers.createFaculty,
);
// create a admin
router.post(
  "/create-admin",
  validateRequest(AdminValidations.CreateAdmin),
  userControllers.createAdmin,
);

router.get("/", userControllers.getAllUser);

export const userRouter = router;
