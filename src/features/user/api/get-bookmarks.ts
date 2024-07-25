import { useQuery } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-current-user';
import { Tweet } from '@/features/tweet/types';
import { supabase } from '@/lib/supabase';

export const fetchUserBookmarks = async (
  userID: string,
  filter: string,
): Promise<Tweet[]> => {
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

  let query = supabase.from('tweets').select('*').in('tweet_id', bookmarkIDs);

  // Apply filter
  if (filter === 'tweets') {
    query = query.eq('is_reply', false).eq('is_retweet', false);
  } else if (filter === 'replies') {
    query = query.eq('is_reply', true);
  } else if (filter === 'media') {
    query = query.not('image', 'is', null);
  } else if (filter === 'likes') {
    query = query.contains('likes', [userID]);
  }

  const { data: tweets, error: tweetError } = await query;

  if (tweetError) {
    throw new Error(tweetError.message);
  }

  return tweets || [];
};

export const useUserBookmarks = (filter: string) => {
  const { user } = useUser();
  const {
    data: bookmarks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userBookmarks', user?.id, filter],
    queryFn: () => fetchUserBookmarks(user?.id as string, filter),
    enabled: !!user?.id,
  });

  return { bookmarks, isLoading, error };
};
