import { model, Schema } from "mongoose";
import { TFaculty, TName } from "./faculty.interface";

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    designation: { type: String, required: true, trim: true },
    name: { type: nameSchema, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
      trim: true,
    },
    dateOfBirth: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    contactNo: { type: String, required: true, trim: true },
    emergencyContactNo: { type: String, required: true, trim: true },
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    profileImage: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
facultySchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});
export const Faculty = model<TFaculty>("Faculty", facultySchema);
