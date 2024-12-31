import { z } from "zod";
import { UserStatus } from "./user.const";

const UserStatusChange = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidations = {
  UserStatusChange,
};
