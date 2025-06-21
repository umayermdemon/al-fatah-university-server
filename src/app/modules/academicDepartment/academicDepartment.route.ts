import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";

const router = Router();

// create a academic Department
router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

// find all academic Department
router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);
// find single academic Department
router.get("/:id", AcademicDepartmentControllers.getSingleAcademicDepartment);
// update single academic Department
router.patch(
  "/:id",
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
