import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { mockLoginFn } from './mocks/login.mock';

type UseLoginOptions = {
  onSuccess?: (data: AuthResponse['data']) => void;
  onError?: (error: AuthError['message']) => void;
};

export const loginFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse['data']> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw error;
  }
  return data;
};

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const isTestEnvironment = true; // should add test env that should toggle this variable
  const mutationFn = isTestEnvironment ? mockLoginFn : loginFn;

  const { mutate: login, isPending } = useMutation({
    mutationFn,
    mutationKey: ['auth-user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], { ...data });
      return onSuccess?.(data);
    },
    onError: (error) => onError?.(error?.message),
  });
  return { login, isPending };
};
