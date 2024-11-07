import { AuthResponse, AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

// import { mockRegisterFn } from './mocks/register.mock';

type UseRegisterOptions = {
  onSuccess?: (user: AuthResponse['data']) => void;
  onError?: (error: AuthError['message']) => void;
};

export async function getUserData(userID: string) {
  if (userID === undefined) return null;
  const { data: users, error } = await supabase
    .from('users')
    .select(
      'id, background_image, avatar_image, username, following, following_count, followers_count, bio, bookmarks, likes, retweets, replies',
    )
    .eq('id', userID);

  if (error) throw new Error(error.message);
  return users.at(0);
}

export const registerFn = async ({
  email,
  password,
  username,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}): Promise<AuthResponse['data']> => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  const { data: users, error: insertionError } = await supabase
    .from('users')
    .insert({ username, firstName, lastName });
  console.log(users);

  if (insertionError) {
    throw insertionError;
  }

  if (error) {
    throw error;
  }

  return data;
};

export const useRegister = ({
  onSuccess,
  onError,
}: UseRegisterOptions = {}) => {
  // const mutationFn = import.meta.env.PROD ? registerFn : mockRegisterFn;
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
