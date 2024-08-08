/* Libraries */
import { z } from "zod";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "User Name is required" })
      .min(3, { message: "User Name has to be at least 3 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email adress" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password has to be at least 8 characters long" })
      .max(30, { message: "Password has to be under 30 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at lest one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at lest one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
      .regex(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/, { message: "Field contains invalid characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email({ message: "" }),
  password: z.string().min(8, { message: "" }).max(30, { message: "" }),
});

type RegisterFormFields = z.infer<typeof registerSchema>;

type LoginForm = {
  email: string;
  password: string;
};

type VerificationForm = {
  email: string;
  token: string;
};

export type { RegisterFormFields, LoginForm, VerificationForm };
export { registerSchema, loginSchema };
