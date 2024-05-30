/* eslint-disable no-restricted-imports */
import { useEffect } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import { z } from 'zod';

import { useUser } from '@/features/auth/api/get-current-user';

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

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { pathname } = useLocation();
  const { user, isLoadingUser } = useUser();
  useEffect(() => {
    if (!user && !isLoadingUser) {
      redirect(`/auth/login?redirect=${pathname}`);
    }
  }, [user, pathname, isLoadingUser]);

  if (!user && !isLoadingUser) return null;
  return children;
};
