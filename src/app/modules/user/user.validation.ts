import { z } from "zod";

const zUser = z.object({
  password: z.string().max(20),
});

export default zUser;
