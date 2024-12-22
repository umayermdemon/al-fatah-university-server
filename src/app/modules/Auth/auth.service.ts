import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is deleted");
  }
  const isBlocked = user?.status;
  if (isBlocked === "Blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "This user is blocked");
  }
  //   check password
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  console.log(isPasswordMatch);
  if (!isPasswordMatch)
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
};

export const authServices = {
  loginUser,
};
