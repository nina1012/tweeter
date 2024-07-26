import { Tweet } from '@/features/tweet/types';
import { supabase } from '@/lib/supabase';

export const getBookmarks = async (
  userID: string,
  filter: 'tweets' | 'replies' | 'media' | 'likes',
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

  if (filter === 'replies') {
    query = query.eq('is_reply', true);
  } else if (filter === 'media') {
    query = query.not('image', 'is', null);
  } else if (filter === 'likes') {
    query = query.not('likes', 'eq', '[]');
  }

  const { data: tweets, error: tweetError } = await query;

  if (tweetError) {
    throw new Error(tweetError.message);
  }

  return tweets || [];
};
