import { AuthResponse, AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

type UseRegisterOptions = {
  onSuccess?: (user: AuthResponse['data']) => void;
  onError?: (error: AuthError['message']) => void;
};

export const registerFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse['data']> => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const useRegister = ({
  onSuccess,
  onError,
}: UseRegisterOptions = {}) => {
  const { mutate: registering, isPending } = useMutation({
    mutationFn: registerFn,
    mutationKey: ['auth-user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], {
        ...data,
      });
      return onSuccess?.(data);
    },
    onError: (error) => onError?.(error?.message),
  });
  return { registering, isPending };
};
