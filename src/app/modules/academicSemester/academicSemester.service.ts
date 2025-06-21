import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import {
  AcademicSemesterNameCodeMapper,
  academicSemesterSearchableFields,
} from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import httpStatus from "http-status";
const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  // academic semester name code mapper
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
// get all academic semester
const getAllAcademicSemesterFromDb = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(academicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await academicSemesterQuery.countTotal();
  const data = await academicSemesterQuery.queryModel;
  return {
    meta,
    data,
  };
};
// get single academic semester
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findOne({ id });
  return result;
};
// update single academic semester
const updateSingleAcademicSemesterFromDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found");
  }
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  updateSingleAcademicSemesterFromDb,
};
