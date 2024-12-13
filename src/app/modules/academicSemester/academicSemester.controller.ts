import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";
import httpStatus from "http-status";

// create a academic semester
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic semester is created successfully",
    data: result,
  });
});
// get all academic semester data
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All academic semester get successfully",
    data: result,
  });
});
// get single academic semester data
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.id;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDb(semesterId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single academic semester get successfully",
    data: result,
  });
});
// update single academic semester data
const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.id;
  const result =
    await AcademicSemesterServices.updateSingleAcademicSemesterFromDb(
      semesterId,
      req.body,
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic semester updated successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
