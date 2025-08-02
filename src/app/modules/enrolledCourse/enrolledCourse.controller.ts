import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrolledCourseServices } from "./enrolledCourse.service";
import httpStatus from "http-status";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await enrolledCourseServices.createEnrolledCourseIntoDb(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is enrolled successfully",
    data: result,
  });
});

export const enrolledCourseControllers = {
  createEnrolledCourse,
};
