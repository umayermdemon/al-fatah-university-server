import AppError from "../../errors/AppError";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import httpStatus from "http-status";

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const isAcademicFacultyExists = await AcademicFaculty.findOne({
    name: payload?.name,
  });
  if (isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${payload?.name} already exists`,
    );
  }
  const result = await AcademicFaculty.create(payload);
  return result;
};
// get all academic Faculty
const getAllAcademicFacultyFromDb = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
// get single academic Faculty
const getSingleAcademicFacultyByIdFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
// get single academic Faculty by name
const getSingleAcademicFacultyByNameFromDb = async (name: string) => {
  const result = await AcademicFaculty.findOne({ name });
  return result;
};
// update single academic Faculty
const updateSingleAcademicFacultyFromDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyByIdFromDb,
  getSingleAcademicFacultyByNameFromDb,
  updateSingleAcademicFacultyFromDb,
};
