import { Router } from "express";
import { studentControllers } from "./student.controller";

const router = Router();

// get all students
router.get("/", studentControllers.getAllStudents);

// get single student
router.get("/:id", studentControllers.getSingleStudents);

// delete single student
router.delete("/:id", studentControllers.deleteSingleStudents);

export const studentRouter = router;
