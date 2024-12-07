import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["Student", "Faculty", "Admin"],
      required: true,
    },
    status: {
      type: String,
      enum: ["In-progress", "Blocked"],
      required: true,
      default: "In-progress",
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const User = model<TUser>("User", userSchema);
