import { Router } from "express";
import { studentControllers } from "./student.controller";

const router = Router();

// create a student
router.post("/create_student", studentControllers.createStudent);

// get all students
router.get("/", studentControllers.getAllStudents);

// get single student
router.get("/:id", studentControllers.getSingleStudents);

export const studentRouter = router;
