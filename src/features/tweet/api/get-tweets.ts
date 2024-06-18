import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

export const getTweets = async (): Promise<Tweet[] | null> => {
  const { data: tweet, error } = await supabase.from('tweets').select('*');

  if (error) throw new Error(error.message);

  return tweet || null;
};

export const useGetTweet = () => {
  const {
    data: tweet,
    isLoading: isLoadingTweet,
    error: tweetError,
  } = useQuery({
    queryKey: ['tweet'],
    queryFn: () => getTweets(),
  });

  return { tweet, isLoadingTweet, tweetError };
};
