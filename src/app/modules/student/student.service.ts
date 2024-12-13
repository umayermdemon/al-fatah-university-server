import { Student } from "./student.model";

// get all students
const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate("academicDepartment")
    .populate("admissionSemester");
  return result;
};

// get single students

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findById(id)
    .populate("academicDepartment")
    .populate("admissionSemester");
  // const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

// delete single students

const deleteSingleStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
};
