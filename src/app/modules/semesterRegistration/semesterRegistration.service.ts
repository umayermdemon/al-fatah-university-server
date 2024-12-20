import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import httpStatus from "http-status";

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  // is academic semester exist?
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found");
  }

  // is semester already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "This semester already registered");
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationIntoDb = async () => {
  const result = await SemesterRegistration.find();
  return result;
};
const getSingleSemesterRegistrationIntoDb = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationIntoDb,
  getSingleSemesterRegistrationIntoDb,
};
