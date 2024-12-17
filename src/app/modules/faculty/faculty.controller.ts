import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.service";

// get all Faculties
const getAllFaculties = catchAsync(async (req, res) => {
  // console.log(req.query);
  const result = await facultyServices.getAllFacultiesFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all Faculties successfully",
    data: result,
  });
});

// get single Faculty
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFacultyFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a Faculty successfully",
    data: result,
  });
});

// update single Faculty
const updateSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.updateSingleFacultyIntoDb(
    id,
    req.body.faculty,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update a Faculty successfully",
    data: result,
  });
});
// delete single Faculty
const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.deleteSingleFacultyFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete a Faculty successfully",
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
