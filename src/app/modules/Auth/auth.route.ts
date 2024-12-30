import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import auth from "../../middlewares/auth";
import { userRole } from "./auth.const";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.LoginValidationSchema),
  authControllers.loginUser,
);
router.post(
  "/change-password",
  auth(userRole.Admin, userRole.Faculty, userRole.Student),
  validateRequest(AuthValidations.ChangeValidationSchema),
  authControllers.changePassword,
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidations.RefreshTokenValidationSchema),
  authControllers.refreshToken,
);
router.post(
  "/forget-password",
  validateRequest(AuthValidations.ForgetPasswordValidationSchema),
  authControllers.forgetPassword,
);
router.post(
  "/reset-password",
  validateRequest(AuthValidations.ResetPasswordValidationSchema),
  authControllers.resetPassword,
);

export const AuthRouter = router;
