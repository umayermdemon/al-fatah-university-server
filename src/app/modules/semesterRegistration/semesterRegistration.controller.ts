import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./semesterRegistration.service";
import httpStatus from "http-status";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDb(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration created successfully",
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationIntoDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registrations are retrieved successfully !",
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
};
