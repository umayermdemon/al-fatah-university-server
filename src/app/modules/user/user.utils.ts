import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "Student",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentStudentSemesterYear = payload.year;
  const currentStudentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentStudentSemesterYear &&
    lastStudentSemesterCode === currentStudentSemesterCode
  ) {
    currentId = lastStudentId.substring(6);
  }
  // console.log(currentStudentSemesterCode);
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "Faculty",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generatedFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `F-${incrementId}`;
  return incrementId;
};
const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "Admin",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generatedAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `A-${incrementId}`;
  return incrementId;
};
