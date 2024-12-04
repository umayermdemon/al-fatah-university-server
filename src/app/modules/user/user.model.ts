import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const User = model<TUser>("User", userSchema);
