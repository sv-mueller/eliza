import * as z from "zod";

export const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required.")
      .max(255, "First name must be at most 255 characters."),
    lastName: z
      .string()
      .min(1, "Last name is required.")
      .max(255, "Last name must be at most 255 characters."),
    email: z
      .email("Email must be valid.")
      .max(255, "Email must be at most 255 characters."),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters.")
      .max(255, "Password must be at most 255 characters."),
    confirmPassword: z.string(),
    // image: z.string().optional(),
    image: z
      .file("Profile image required")
      .max(1024 * 1024, "Profile image should not exceed 1MB.")
      .mime(
        ["image/jpeg", "image/png", "image/webp"],
        "Profile image supports only .jpeg, .jpg, .png and .webp formats",
      )
      .optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
