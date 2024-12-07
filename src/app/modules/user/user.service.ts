import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// create a student
const createStudentIntoDb = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};

  user.id = "123456";
  user.password = password || (config.default_password as string);
  user.role = "Student";

  // create a user
  const newUser = await User.create(user);

  // create a student

  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id;

    const newStudent = await Student.create(student);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDb,
};
