import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import { UserStatus } from "./user.const";
const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
      select: 0,
    },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },
    status: {
      type: String,
      enum: UserStatus,
      required: true,
      default: "in-progress",
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

// pre save middleware/ password bcrypt
userSchema.pre("save", async function (next) {
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
  return await User.findOne({ id }).select("+password");
};
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.isJwtIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime = passwordChangedTimestamp.getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>("User", userSchema);
