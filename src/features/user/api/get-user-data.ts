import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { User } from '../types/index';

export const getUserData = async (userID: string): Promise<User | null> => {
  if (!userID) return null;
  const { data: users, error } = await supabase
    .from('users')
    .select(
      'user_id, background_image, avatar_image, username, following, following_count, followers_count, bio, bookmarks, likes, retweets, replies, firstName, lastName',
    )
    .eq('user_id', userID);

  if (error) throw new Error(error.message);
  return users[0] as User;
};

export const useGetUserData = (userID: string) => {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: userDataError,
  } = useQuery({
    queryKey: ['user', userID],
    queryFn: () => getUserData(userID),
  });

  return { userData, isLoadingUserData, userDataError };
};
