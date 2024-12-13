import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

//create academic department
const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// get all academic Faculty
const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};
// get single academic Faculty
const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate("academicFaculty");
  return result;
};
// update single academic Faculty
const updateSingleAcademicDepartmentFromDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  updateSingleAcademicDepartmentFromDb,
};
