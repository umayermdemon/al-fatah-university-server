import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zAuthValidations } from "./auth.validation";
import auth from "../../middlewares/auth";
import { userRole } from "./auth.const";

const router = Router();

router.post(
  "/login",
  validateRequest(zAuthValidations.zLoginValidationSchema),
  authControllers.loginUser,
);
router.post(
  "/change-password",
  auth(userRole.Admin, userRole.Faculty, userRole.Student),
  validateRequest(zAuthValidations.zChangeValidationSchema),
  authControllers.changePassword,
);
router.post(
  "/refresh-token",
  validateRequest(zAuthValidations.zRefreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const AuthRouter = router;
