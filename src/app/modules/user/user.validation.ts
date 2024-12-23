import { z } from "zod";

const zUser = z.object({
  password: z.string().min(6).max(15),
});

export default zUser;
