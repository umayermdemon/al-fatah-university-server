import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import auth from "../../middlewares/auth";

const router = Router();

// create a academic semester
router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);

// find single academic semester
router.get(
  "/:id",
  auth("admin"),
  AcademicSemesterControllers.getSingleAcademicSemester,
);
// update single academic semester
router.patch(
  "/:id",
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

// find all academic semester
router.get(
  "/",
  // auth("admin"),
  AcademicSemesterControllers.getAllAcademicSemester,
);

export const AcademicSemesterRouter = router;
