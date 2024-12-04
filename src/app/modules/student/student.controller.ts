/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { studentServices } from "./student.service";
import zStudent from "./student.validation";

// create a student
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.students;
    const zValidationData = zStudent.parse(student);
    const result = await studentServices.createStudentIntoDb(zValidationData);
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

// get single students
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentServices.getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: "Get a student successfully",
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

// delete single students
const deleteSingleStudents = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentServices.deleteSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: "Delete a student successfully",
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
  getSingleStudents,
  deleteSingleStudents,
};
