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
  const result = await Student.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
};
