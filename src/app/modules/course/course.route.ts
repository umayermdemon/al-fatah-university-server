import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseControllers } from "./course.controller";
import { zCourseValidations } from "./course.validation";

const router = Router();

// create course
router.post(
  "/create-course",
  validateRequest(zCourseValidations.zCreateCourseValidationSchema),
  courseControllers.createCourse,
);

// get all courses
router.get("/", courseControllers.getAllCourses);

// get single course
router.get("/:id", courseControllers.getSingleCourse);

// update single course
router.patch(
  "/:id",
  validateRequest(zCourseValidations.zUpdateCourseValidationSchema),
  courseControllers.updateSingleCourse,
);

// add courseFaculty
router.put(
  "/:courseId/assign-faculties",
  validateRequest(zCourseValidations.zUpdateCourseFacultyValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);
// remove courseFaculty
router.delete(
  "/:courseFacultyId/remove-faculties",
  validateRequest(zCourseValidations.zUpdateCourseFacultyValidationSchema),
  courseControllers.removeFacultiesWithCourse,
);
// delete single course
router.delete("/:id", courseControllers.deleteSingleCourse);

export const courseRouter = router;
