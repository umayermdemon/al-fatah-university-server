import { Router } from "express";
import { studentControllers } from "./student.controller";

const router = Router();

router.post("/create_student", studentControllers.createStudent);

export const studentRouter = router;
