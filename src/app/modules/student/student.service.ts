import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// create a student
const createStudentIntoDb = async (student: TStudent) => {
  const result = await Student.create(student);
  return result;
};

// get all students
const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

// get single students

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// delete single students

const deleteSingleStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
};
