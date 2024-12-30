import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { offeredCourseControllers } from "./offeredCourse.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.CreateOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
);
router.get(
  "/",
  auth("Admin", "Faculty", "Student"),
  offeredCourseControllers.getAllOfferedCourse,
);
router.get("/:id", offeredCourseControllers.getSingleOfferedCourse);
router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.UpdateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
);
router.delete("/:id", offeredCourseControllers.deleteOfferedCourse);

export const offeredCourseRouter = router;
