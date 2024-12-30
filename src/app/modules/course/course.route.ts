import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseControllers } from "./course.controller";
import { CourseValidations } from "./course.validation";

const router = Router();

// create course
router.post(
  "/create-course",
  validateRequest(CourseValidations.CreateCourseValidationSchema),
  courseControllers.createCourse,
);

// get all courses
router.get("/", courseControllers.getAllCourses);

// get single course
router.get("/:id", courseControllers.getSingleCourse);

// update single course
router.patch(
  "/:id",
  validateRequest(CourseValidations.UpdateCourseValidationSchema),
  courseControllers.updateSingleCourse,
);

// add courseFaculty
router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.UpdateCourseFacultyValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);
// remove courseFaculty
router.delete(
  "/:courseFacultyId/remove-faculties",
  validateRequest(CourseValidations.UpdateCourseFacultyValidationSchema),
  courseControllers.removeFacultiesWithCourse,
);
// delete single course
router.delete("/:id", courseControllers.deleteSingleCourse);

export const courseRouter = router;
