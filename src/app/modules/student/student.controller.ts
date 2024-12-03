/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { studentServices } from "./student.service";

// create a student
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.students;
    const result = await studentServices.createStudentIntoDb(student);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to created student",
      error: err.message,
    });
  }
};

// get all students

const getAllStudents = async (req: Request, res: Response) => {
  try {
    // const student = req.body;
    const result = await studentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: "Get all students successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
};
