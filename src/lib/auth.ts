import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useUser } from '@/features/auth/api/get-current-user';

// form schemas
export const registerInputSchema = z
  .object({
    // these credentials are important for auth.users
    email: z.string().min(1, 'Required').email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm: z.string().min(6, 'Password must be at least 6 characters long'),
    // for setting user inside my custom users table
    firstName: z.string().min(1, 'Provide your first name'),
    lastName: z.string().min(1, 'Provide your last name'),
    username: z
      .string()
      .min(1, 'Required')
      .regex(/^[a-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, {
        message:
          'Username must only contain lowercase letters, numbers, and special characters and be unique',
      }),
  })
  .refine((credentials) => credentials.password === credentials.confirm, {
    message: `Password and confirmed password don't match`,
    path: ['confirm'],
  });

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
];

// update shema
export const editUserProfileSchema = z.object({
  backgroundImage: z.instanceof(FileList).refine((files) => {
    if (!files || files.length === 0) return true; // Allow empty FileList
    const file = files[0];
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, 'File must be a PNG'),
  avatarImage: z
    .instanceof(FileList)
    .optional()
    .refine((file) => {
      // console.log(file);
      return !file || file[0]?.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB'),
});

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { user, isLoadingUser, isAuthenticated, fetchStatus, userError } =
    useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser && fetchStatus !== 'fetching') {
      navigate('/auth/login');
    }
  }, [isAuthenticated, isLoadingUser, fetchStatus, navigate, user]);

  // if (isLoadingUser) {
  //   return 'loading...';
  // }

  if (userError) {
    throw userError;
  }

  return children;
};
