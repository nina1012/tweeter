import { z } from 'zod';

// form schemas
export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .refine((credentials) => credentials.password === credentials.confirm, {
    message: `Password and confirmed password don't match`,
    path: ['confirm'],
  });

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
