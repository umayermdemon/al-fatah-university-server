import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { zAcademicDepartmentValidations } from "./academicDepartment.validation";

const router = Router();

// create a academic Department
router.post(
  "/create-academic-department",
  // validateRequest(
  //   zAcademicDepartmentValidations.createAcademicDepartmentValidation,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

// find all academic Department
router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);
// find single academic Department
router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
// update single academic Department
router.patch(
  "/:departmentId",
  validateRequest(
    zAcademicDepartmentValidations.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
