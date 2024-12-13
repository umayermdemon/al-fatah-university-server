import { z } from "zod";

// Capitalize validation logic
const capitalizeValidation = z
  .string()
  .min(1, "Field is required")
  .refine(value => value.charAt(0) === value.charAt(0).toUpperCase(), {
    message: "First word must start with a capital letter",
  });

// Define Zod schema for TUserName
const zUserName = z.object({
  firstName: capitalizeValidation,
  middleName: capitalizeValidation.optional(),
  lastName: capitalizeValidation,
});

// Define Zod schema for TGuardian
const zGuardian = z.object({
  fatherName: capitalizeValidation,
  fatherOccupation: capitalizeValidation,
  fatherContactNo: z.string().min(1, "Father contact number is required"),
  motherName: capitalizeValidation,
  motherOccupation: capitalizeValidation,
  motherContactNo: z.string().min(1, "Mother contact number is required"),
});

// Define Zod schema for TLocalGuardian
const zLocalGuardian = z.object({
  name: capitalizeValidation,
  occupation: capitalizeValidation,
  contactNo: z.string().min(1, "Local guardian contact number is required"),
  address: z.string().min(1, "Local guardian address is required"),
});

// Define Zod schema for TStudent
const zCreateStudent = z.object({
  body: z.object({
    password: z.string().max(25).optional(),
    student: z.object({
      name: zUserName,
      gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
      }),
      dateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
      email: z.string().email("Invalid email address"),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required"),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      guardian: zGuardian,
      localGuardian: zLocalGuardian,
      admissionSemester: z.string(),
      profileImage: z.string().url("Profile image must be a valid URL"),
    }),
  }),
});

export const zStudentValidations = {
  zCreateStudent,
};
