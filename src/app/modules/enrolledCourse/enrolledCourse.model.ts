import { model, Schema } from "mongoose";
import { TCourseMarks, TEnrolledCourse } from "./enrolledCourse.interface";
import { Grade } from "./enrolledCourse.const";

const courseMarksSchema = new Schema<TCourseMarks>(
  {
    classTest1: {
      type: Number,
      default: 0,
    },
    midTerm: {
      type: Number,
      default: 0,
    },
    classTest2: {
      type: Number,
      default: 0,
    },
    finalTerm: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "SemesterRegistration",
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicFaculty",
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicDepartment",
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "OfferedCourse",
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  isEnrolled: {
    type: Boolean,
    required: true,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  grade: {
    type: String,
    enum: Grade,
    default: "NA",
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const EnrolledCourse = model<TEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseSchema,
);
