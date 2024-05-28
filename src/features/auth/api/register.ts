import { AuthResponse } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

type UseRegisterOptions = {
  onSuccess?: (user: AuthResponse['data']) => void;
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
    throw new Error(error.message);
  }
  return data;
};

export const useRegister = ({ onSuccess }: UseRegisterOptions = {}) => {
  const { mutate: registering, isPending } = useMutation({
    mutationFn: registerFn,
    mutationKey: ['auth-user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], {
        ...data,
      });
      return onSuccess?.(data);
    },
  });
  return { registering, isPending };
};
