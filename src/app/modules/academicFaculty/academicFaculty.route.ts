import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidations } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = Router();

// create a academic Faculty
router.post(
  "/create-academic-faculty",
  validateRequest(AcademicFacultyValidations.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);

// find all academic Faculty
router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);
// find single academic Faculty
router.get("/:id", AcademicFacultyControllers.getSingleAcademicFaculty);
// update single academic Faculty
router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRouter = router;
