import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// get all students
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentsFromDb();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get all students successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get single students
const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentServices.getSingleStudentFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get a student successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// delete single students
const deleteSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentServices.deleteSingleStudentFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Delete a student successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
};
