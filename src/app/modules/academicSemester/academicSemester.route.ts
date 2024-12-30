import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = Router();

// create a academic semester
router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);

// find single academic semester
router.get("/:id", AcademicSemesterControllers.getSingleAcademicSemester);
// update single academic semester
router.patch(
  "/:id",
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

// find all academic semester
router.get("/", AcademicSemesterControllers.getAllAcademicSemester);

export const AcademicSemesterRouter = router;
