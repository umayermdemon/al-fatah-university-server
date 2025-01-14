import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "../student/student.validation";
import { FacultyValidations } from "../faculty/faculty.validation";
import { AdminValidations } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { UserValidations } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

// create a user
router.post(
  "/create-student",
  auth("admin"),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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
// change status
router.patch(
  "/change-status/:id",
  auth("admin"),
  validateRequest(UserValidations.UserStatusChange),
  userControllers.changeStatus,
);
// get me
router.get("/me", auth("admin", "faculty", "admin"), userControllers.getMe);

router.get("/", auth("admin"), userControllers.getAllUser);

export const userRouter = router;
