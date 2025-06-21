import { model, Schema } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
//
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No is required"],
    trim: true,
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true, trim: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
      trim: true,
    },
    dateOfBirth: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    contactNo: { type: String, required: true, trim: true },
    emergencyContactNo: {
      type: String,
      required: true,
      trim: true,
    },
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    profileImage: { type: String },
    isDeleted: { type: Boolean, required: true, trim: true, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// pre find middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// pre findOne middleware
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// pre aggregate middleware
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent>("Student", studentSchema);
