import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { AcademicFacultyServices } from "./academicFaculty.service";

// create a academic Faculty
const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Faculty is created successfully",
    data: result,
  });
});
// get all academic Faculty data
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All academic Faculty get successfully",
    data: result,
  });
});
// get single academic Faculty data
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single academic Faculty get successfully",
    data: result,
  });
});
// update single academic Faculty data
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.updateSingleAcademicFacultyFromDb(
      facultyId,
      req.body,
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Faculty updated successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
