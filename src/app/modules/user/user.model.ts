import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "Password must be longer than 6 character"],
      maxlength: [25, "Password can't be more then 25 character"],
    },
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

// pre save middleware/ password bcrypt
userSchema.pre("save", async function (next) {
  // const user = this;

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/ empty password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id });
};
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
export const User = model<IUser, UserModel>("User", userSchema);
