import { z } from "zod";

const zLoginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6)
      .max(15),
  }),
});
const zChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6)
      .max(15),
  }),
});

export const zLoginValidations = {
  zLoginValidationSchema,
  zChangeValidationSchema,
};
