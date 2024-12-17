import mongoose from "mongoose";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";
import { FacultySearchableFields } from "./faculty.const";

// get all faculties
const getAllFacultiesFromDb = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.queryModel;

  return result;
};

// get single faculty

const getSingleFacultyFromDb = async (id: string) => {
  const isFacultyExists = await Faculty.findById(id);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty doesn't exist");
  }
  const result = await Faculty.findById(id);
  return result;
};

// update single faculty
const updateSingleFacultyIntoDb = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  if (name && [name]?.length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete single faculty
const deleteSingleFacultyFromDb = async (id: string) => {
  const isFacultyExists = await Faculty.findById(id);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty doesn't exist");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete a faculty
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }
    // delete a user
    const userId = deletedFaculty.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
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
    return [deletedFaculty, deletedUser];
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed delete faculty");
  }
};

export const facultyServices = {
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
  updateSingleFacultyIntoDb,
  deleteSingleFacultyFromDb,
};
