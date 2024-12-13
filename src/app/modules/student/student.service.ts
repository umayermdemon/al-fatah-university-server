import mongoose from "mongoose";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TStudent } from "./student.interface";

// get all students
const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate("academicDepartment")
    .populate("admissionSemester");
  return result;
};

// get single students

const getSingleStudentFromDb = async (id: string) => {
  const isStudentExists = await Student.findOne({ id });
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist");
  }
  const result = await Student.findOne({ id })
    .populate("academicDepartment")
    .populate("admissionSemester");
  // const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

// update single student
const updateSingleStudentIntoDb = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && [name].length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && [guardian].length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && [localGuardian].length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  console.log(name);
  console.log(modifiedUpdatedData);
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete single students
const deleteSingleStudentFromDb = async (id: string) => {
  const isStudentExists = await Student.findOne({ id });
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete a student
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }
    // delete a user
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return [deletedStudent, deletedUser];
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed delete student");
  }
};

export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateSingleStudentIntoDb,
  deleteSingleStudentFromDb,
};
