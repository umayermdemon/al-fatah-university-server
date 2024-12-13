import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { AcademicDepartmentServices } from "./academicDepartment.service";

// create a academic Department
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department is created successfully",
    data: result,
  });
});
// get all academic Department data
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All academic Department get successfully",
    data: result,
  });
});
// get single academic Department data
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(
      departmentId,
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single academic Department get successfully",
    data: result,
  });
});
// update single academic Department data
const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateSingleAcademicDepartmentFromDb(
      departmentId,
      req.body,
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department updated successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
