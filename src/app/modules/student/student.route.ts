import { Router } from "express";
import { studentControllers } from "./student.controller";
import auth from "../../middlewares/auth";

const router = Router();

// get all students
router.get("/", auth("admin", "faculty"), studentControllers.getAllStudents);

// get single student
router.get(
  "/:id",
  auth("admin", "admin"),
  studentControllers.getSingleStudents,
);

// update single student
router.patch("/:id", studentControllers.updateSingleStudents);
// delete single student
router.delete("/:id", studentControllers.deleteSingleStudents);

export const studentRouter = router;
