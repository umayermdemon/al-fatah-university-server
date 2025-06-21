import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidations } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
// import auth from "../../middlewares/auth";

const router = Router();

// create a academic Faculty
router.post(
  "/create-academic-faculty",
  // auth("admin"),
  validateRequest(AcademicFacultyValidations.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);

// find all academic Faculty
router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);
// find single academic Faculty By Id
router.get("/:id", AcademicFacultyControllers.getSingleAcademicFacultyById);
// find single academic Faculty By Name
router.get(
  "/byName/:name",
  AcademicFacultyControllers.getSingleAcademicFacultyByName,
);
// update single academic Faculty
router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRouter = router;
