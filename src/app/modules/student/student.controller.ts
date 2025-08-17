import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// get all students
const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all students successfully",
    data: result,
  });
});

// get single student
const getSingleStudents = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudentFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a student successfully",
    data: result,
  });
});

// update single student
const updateSingleStudents = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.updateSingleStudentIntoDb(
    id,
    req.body.student,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update a student successfully",
    data: result,
  });
});
// delete single student
const deleteSingleStudents = catchAsync(async (req, res) => {
  const { id } = req.params;
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
  updateSingleStudents,
  deleteSingleStudents,
};

