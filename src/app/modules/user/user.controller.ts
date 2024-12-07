/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";

// // catchAsync
// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(err => next(err));
//   };
// };

// create a student
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  // const zValidationData = zStudent.parse(student);
  const result = await userServices.createStudentIntoDb(password, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
