import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zLoginValidations } from "./auth.validation";
import auth from "../../middlewares/auth";
import { userRole } from "./auth.const";

const router = Router();

router.post(
  "/login",
  validateRequest(zLoginValidations.zLoginValidationSchema),
  authControllers.loginUser,
);
router.post(
  "/change-password",
  auth(userRole.Admin, userRole.Faculty, userRole.Student),
  validateRequest(zLoginValidations.zChangeValidationSchema),
  authControllers.changePassword,
);

export const AuthRouter = router;
