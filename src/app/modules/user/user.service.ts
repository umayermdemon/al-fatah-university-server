/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// create a student
const createStudentIntoDb = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};
  const admissionSemester = await AcademicSemester.findById(
    student.admissionSemester,
  );
  if (admissionSemester) {
    user.id = await generatedStudentId(admissionSemester);
  }
  user.password = password || (config.default_password as string);
  user.role = "Student";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user[transaction-1]
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    student.id = newUser[0].id;
    student.user = newUser[0]._id;

    // create a student [transaction-2]
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const userServices = {
  createStudentIntoDb,
};
