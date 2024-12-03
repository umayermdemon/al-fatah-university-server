import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// create a student
const createStudentIntoDb = async (student: TStudent) => {
  const result = await Student.create(student);
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
};
