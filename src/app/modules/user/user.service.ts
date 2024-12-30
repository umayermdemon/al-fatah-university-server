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
import QueryBuilder from "../../builder/QueryBuilder";
import { userSearchableFields } from "./user.const";

// create a student
const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // console.log(student);
  const user: Partial<IUser> = {};
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (admissionSemester) {
    user.id = await generatedStudentId(admissionSemester);
  }
  user.password = password || (config.default_password as string);
  user.role = "Student";
  user.email = payload?.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user[transaction-1]
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student [transaction-2]
    const newStudent = await Student.create([payload], { session });
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
const createFacultyIntoDb = async (password: string, payload: TFaculty) => {
  const user: Partial<IUser> = {};
  user.id = await generatedFacultyId();
  user.role = "Faculty";
  user.email = payload?.email;
  user.password = password || (config.default_password as string);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user[transaction-1]
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create a faculty [transaction-2]
    const newFaculty = await Faculty.create([payload], { session });
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
const createAdminIntoDb = async (password: string, payload: TAdmin) => {
  const user: Partial<IUser> = {};
  user.id = await generatedAdminId();
  user.role = "Admin";
  user.email = payload?.email;
  user.password = password || (config.default_password as string);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user[transaction-1]
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create a admin [transaction-2]
    const newAdmin = await Admin.create([payload], { session });
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

// get all user
const getAllUserFromDb = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await userQuery.queryModel;
  return result;
};

export const userServices = {
  createStudentIntoDb,
  createFacultyIntoDb,
  createAdminIntoDb,
  getAllUserFromDb,
};
