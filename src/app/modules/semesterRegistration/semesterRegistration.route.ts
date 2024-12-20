import { Router } from "express";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zSemesterRegistrationValidations } from "./semesterRegistration.validation";

const router = Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    zSemesterRegistrationValidations.zCreateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get("/", semesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  "/:id",
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

export const semesterRegistrationRouter = router;
