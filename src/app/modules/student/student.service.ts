import mongoose from "mongoose";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TStudent } from "./student.interface";
import { studentSearchableFields } from "./student.const";

// get all students
const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; //copy query

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map(field => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  // exclude fields where delete exact field
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach(el => delete queryObj[el]);
  console.log(query, queryObj);

  // filterQuery
  const filterQuery = searchQuery
    .find(queryObj)
    .populate("academicDepartment")
    .populate("admissionSemester");

  // sortQuery
  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  // limit & paginate query
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * skip;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  // fields limiting

  let fields = "-__v";
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldsQuery = await limitQuery.select(fields);

  return fieldsQuery;
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
