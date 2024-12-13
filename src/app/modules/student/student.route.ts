import { Router } from "express";
import { studentControllers } from "./student.controller";

const router = Router();

// get all students
router.get("/", studentControllers.getAllStudents);

// get single student
router.get("/:studentId", studentControllers.getSingleStudents);

// delete single student
router.delete("/:studentId", studentControllers.deleteSingleStudents);

export const studentRouter = router;
