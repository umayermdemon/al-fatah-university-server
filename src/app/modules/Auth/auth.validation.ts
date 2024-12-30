import { z } from "zod";

const LoginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6)
      .max(15),
  }),
});
const ChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6)
      .max(15),
  }),
});
const RefreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }),
});
const ForgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
  }),
});
const ResetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "User Id is required" }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});

export const AuthValidations = {
  LoginValidationSchema,
  ChangeValidationSchema,
  RefreshTokenValidationSchema,
  ForgetPasswordValidationSchema,
  ResetPasswordValidationSchema,
};
