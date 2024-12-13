import { Student } from "./student.model";

// get all students
const getAllStudentsFromDb = async () => {
  const result = await Student.find().populate("user");
  return result;
};

// get single students

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findById(id).populate("user");
  // const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

// delete single students

const deleteSingleStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
};
