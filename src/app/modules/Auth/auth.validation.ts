import { z } from "zod";

const zLoginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const zLoginValidations = {
  zLoginValidationSchema,
};
