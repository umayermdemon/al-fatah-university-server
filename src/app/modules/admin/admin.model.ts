import { model, Schema } from "mongoose";
import { TAdmin, TName } from "./admin.interface";

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const adminSchema = new Schema<TAdmin>({
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
  profileImage: { type: String, required: true, trim: true },
  isDeleted: { type: Boolean, default: false },
});
export const Admin = model<TAdmin>("Admin", adminSchema);
