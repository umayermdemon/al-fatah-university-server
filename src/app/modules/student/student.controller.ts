import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.students;
    const result = await studentServices.createStudentIntoDb(student);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers = {
  createStudent,
};
