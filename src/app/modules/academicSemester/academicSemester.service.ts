import AppError from "../../errors/AppError";
import { AcademicSemesterNameCodeMapper } from "./academicSemester.const";
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
const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
// get single academic semester
const getSingleAcademicSemesterFromDb = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ semesterId });
  return result;
};
// update single academic semester
const updateSingleAcademicSemesterFromDb = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }

  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    payload,
    { new: true },
  );
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
