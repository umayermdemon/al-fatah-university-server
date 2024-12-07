/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.service";

// create a student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;
    // const zValidationData = zStudent.parse(students);
    const result = await userServices.createStudentIntoDb(password, student);
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

export const userControllers = {
  createStudent,
};
