import { z } from 'zod';

// form schemas
export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required').email(),
    password: z.string().min(6, 'Required'),
    confirm: z.string().min(6, 'Required'),
  })
  .refine((data) => data.password === data.confirm, {
    message: `Password and confirmed password don't match`,
    path: ['confirm'],
  });
