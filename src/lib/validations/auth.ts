import { z } from "zod";
import { ASEAN_COUNTRIES, USER_ROLES } from "@/lib/constants";

const aseanCountryNames = ASEAN_COUNTRIES.map((c) => c.name) as [string, ...string[]];

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  companyName: z
    .string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  country: z.enum(aseanCountryNames, {
    errorMap: () => ({ message: "Please select a valid ASEAN country" }),
  }),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(128, { message: "Password must be less than 128 characters" }),
  companyName: z
    .string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  country: z.enum(aseanCountryNames, {
    errorMap: () => ({ message: "Please select a valid ASEAN country" }),
  }),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
