import { useQuery } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-current-user';
import { Tweet } from '@/features/tweet/types';
import { supabase } from '@/lib/supabase';

export const fetchUserBookmarks = async (userID: string): Promise<Tweet[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('bookmarks')
    .eq('user_id', userID)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.bookmarks) {
    return [];
  }

  const bookmarkIDs = data.bookmarks as string[];
  const { data: tweets, error: tweetError } = await supabase
    .from('tweets')
    .select('*')
    .in('tweet_id', bookmarkIDs);

  if (tweetError) {
    throw new Error(tweetError.message);
  }
  console.log(bookmarkIDs, tweets);

  return tweets || [];
};

export const useUserBookmarks = () => {
  const { user } = useUser();
  const {
    data: bookmarks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userBookmarks', user?.id],
    queryFn: () => fetchUserBookmarks(user?.id as string),
  });

  return { bookmarks, isLoading, error };
};
