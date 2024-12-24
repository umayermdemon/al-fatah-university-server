import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import jwt from "jsonwebtoken";

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

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  // create token & send to the client

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const user = await User.isUserExistsByCustomId(userData?.userId);
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
    payload?.oldPassword,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }
  // new password hashed
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return result;
};
const refreshToken = async (token: string) => {
  // verify the token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);
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

  const passwordChangedAt = user.passwordChangedAt;

  if (
    passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChanged(passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
};
