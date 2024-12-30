import { Router } from "express";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";

const router = Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.CreateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get("/", semesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  "/:id",
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  "/:id",
  semesterRegistrationControllers.updateSemesterRegistration,
);
router.delete(
  "/:id",
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const semesterRegistrationRouter = router;
