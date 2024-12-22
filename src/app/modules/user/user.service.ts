/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import {
  generatedAdminId,
  generatedFacultyId,
  generatedStudentId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { Faculty } from "../faculty/faculty.model";

// create a student
const createStudentIntoDb = async (password: string, student: TStudent) => {
  const user: Partial<IUser> = {};
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

// create a faculty
const createFacultyIntoDb = async (password: string, faculty: TFaculty) => {
  const user: Partial<IUser> = {};
  user.id = await generatedFacultyId();
  user.role = "Faculty";
  user.password = password || (config.default_password as string);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user[transaction-1]
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    faculty.id = newUser[0].id;
    faculty.user = newUser[0]._id;
    // create a faculty [transaction-2]
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};
// create a admin
const createAdminIntoDb = async (password: string, admin: TAdmin) => {
  const user: Partial<IUser> = {};
  user.id = await generatedAdminId();
  user.role = "Admin";
  user.password = password || (config.default_password as string);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user[transaction-1]
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    admin.id = newUser[0].id;
    admin.user = newUser[0]._id;
    // create a admin [transaction-2]
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const userServices = {
  createStudentIntoDb,
  createFacultyIntoDb,
  createAdminIntoDb,
};
