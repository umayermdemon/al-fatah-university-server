/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { userRole } from "../Auth/auth.const";

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: "Student" | "Admin" | "Faculty";
  status: "In-progress" | "Blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof userRole;
