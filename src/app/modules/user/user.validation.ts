import { z } from "zod";

const UserValidation = z.object({
  password: z.string().min(6).max(15),
});

export default UserValidation;
