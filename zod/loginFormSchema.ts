import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .email("Email must be valid.")
    .max(255, "Email must be at most 255 characters."),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(255, "Password must be at most 255 characters."),
});
