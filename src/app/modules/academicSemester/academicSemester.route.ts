import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = Router();

// create a academic semester
router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.AcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);

// find all academic semester
router.get(
  "/get-all-academic-semester",
  AcademicSemesterControllers.getAllAcademicSemester,
);

export const AcademicSemesterRouter = router;
