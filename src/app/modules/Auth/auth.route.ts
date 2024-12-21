import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zLoginValidations } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(zLoginValidations.zLoginValidationSchema),
  authControllers.loginUser,
);

export const AuthRouter = router;
