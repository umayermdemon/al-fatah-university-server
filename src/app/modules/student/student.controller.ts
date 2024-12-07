/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";

// get all students
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all students successfully",
    data: result,
  });
});

// get single students
const getSingleStudents = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await studentServices.getSingleStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a student successfully",
    data: result,
  });
});

// delete single students
const deleteSingleStudents = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await studentServices.deleteSingleStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete a student successfully",
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
};
