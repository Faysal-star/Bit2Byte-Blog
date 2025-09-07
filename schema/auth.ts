import { z } from 'zod';

// Sign Up Schemas
export const SignUpInputSchema = z.object({
  email: z.email()
    .min(1, 'Email is required')
    .max(100, 'Email must be less than 100 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
  name: z.string()
    .min(1, 'Name is required')
    .max(200, 'Name must be less than 200 characters')
    .trim()
});

export const SignUpFormDataSchema = z.object({
  info: z.string().refine((str) => {
    try {
      const parsed = JSON.parse(str);
      return SignUpInputSchema.parse(parsed);
    } catch {
      return false;
    }
  }, 'Invalid sign up information'),
  photo: z.instanceof(File, { message: 'Profile photo must be a valid file' })
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), 
      'Only JPEG, PNG, and WebP images are allowed')
    .optional()
});

// Login Schemas
export const LoginInputSchema = z.object({
  email: z.email()
    .min(1, 'Email is required')
    .max(100, 'Email must be less than 100 characters'),
  password: z.string()
    .min(1, 'Password is required')
    .max(50, 'Password must be less than 50 characters')
});

// Form validation helpers
export const validateSignUpForm = (data: {
  email: string;
  password: string;
  name: string;
  photo: File | null;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  try {
    SignUpInputSchema.parse({
      email: data.email,
      password: data.password,
      name: data.name
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(...error.issues.map((err: any) => err.message));
    }
  }

  // Photo is optional, but if provided, validate it
  if (data.photo) {
    try {
      // Create a validation schema for the photo
      const photoSchema = z.instanceof(File, { message: 'Profile photo must be a valid file' })
        .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
        .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), 
          'Only JPEG, PNG, and WebP images are allowed');
      
      photoSchema.parse(data.photo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(...error.issues.map((err: any) => err.message));
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateLoginForm = (data: {
  email: string;
  password: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  try {
    LoginInputSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(...error.issues.map((err: any) => err.message));
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Type exports
export type SignUpInputType = z.infer<typeof SignUpInputSchema>;
export type LoginInputType = z.infer<typeof LoginInputSchema>;
