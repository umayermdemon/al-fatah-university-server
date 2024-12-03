import { Router } from "express";
import { studentControllers } from "./student.controller";

const router = Router();

// create a student
router.post("/create_student", studentControllers.createStudent);

// get all students
router.get("/", studentControllers.getAllStudents);

export const studentRouter = router;
