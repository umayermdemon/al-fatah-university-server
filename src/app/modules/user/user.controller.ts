import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// create a student
const createStudent = catchAsync(async (req, res) => {
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
// create a faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  // const zValidationData = zStudent.parse(student);
  const result = await userServices.createFacultyIntoDb(password, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty created successfully",
    data: result,
  });
});
// create a admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  // const zValidationData = zStudent.parse(student);
  const result = await userServices.createAdminIntoDb(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

// get all user
const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user are retrieved successfully",
    data: result,
  });
});
// get all user
const getMe = catchAsync(async (req, res) => {
  const token = req?.headers.authorization;
  const result = await userServices.getMe(token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUser,
  getMe,
};
