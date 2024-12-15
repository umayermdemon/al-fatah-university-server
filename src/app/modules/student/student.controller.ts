import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// get all students
const getAllStudents = catchAsync(async (req, res) => {
  // console.log(req.query);
  const result = await studentServices.getAllStudentsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all students successfully",
    data: result,
  });
});

// get single students
const getSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a student successfully",
    data: result,
  });
});

// update single students
const updateSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.updateSingleStudentIntoDb(
    studentId,
    req.body.student,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update a student successfully",
    data: result,
  });
});
// delete single students
const deleteSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteSingleStudentFromDb(studentId);

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
