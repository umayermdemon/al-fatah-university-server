import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async (student: TStudent) => {
  const result = await Student.create(student);
  return result;
};

export const studentServices = {
  createStudentIntoDb,
};
