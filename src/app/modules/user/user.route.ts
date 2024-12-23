import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zStudentValidations } from "../student/student.validation";
import { zFacultyValidations } from "../faculty/faculty.validation";
import { zAdminValidations } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { userRole } from "../Auth/auth.const";

const router = Router();

// create a user
router.post(
  "/create-student",
  auth(userRole.Admin),
  validateRequest(zStudentValidations.zCreateStudent),
  userControllers.createStudent,
);
// create a faculty
router.post(
  "/create-faculty",
  validateRequest(zFacultyValidations.zCreateFaculty),
  userControllers.createFaculty,
);
// create a admin
router.post(
  "/create-admin",
  validateRequest(zAdminValidations.zCreateAdmin),
  userControllers.createAdmin,
);

router.get("/", userControllers.getAllUser);

export const userRouter = router;
