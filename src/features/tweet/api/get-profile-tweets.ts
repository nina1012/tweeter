import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

export const getProfileTweets = async (
  userID: string,
  filter: 'tweets' | 'replies' | 'media' | 'likes',
): Promise<Tweet[]> => {
  let query = supabase.from('tweets').select('*').eq('author_id', userID);

  if (filter === 'replies') {
    query = query.eq('is_reply', true);
  } else if (filter === 'media') {
    query = query.not('image', 'is', null);
  } else if (filter === 'likes') {
    query = query.not('likes', 'eq', '[]');
  }

  const { data: tweets, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return tweets || [];
};
