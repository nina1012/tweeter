import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

export const getTweetFn = async (tweetID: string): Promise<Tweet | null> => {
  if (!tweetID) return null;
  const { data: tweet, error } = await supabase
    .from('tweets')
    .select()
    .eq('tweet_id', tweetID);
  if (error) throw new Error(error.message);
  return tweet[0];
};

export const useGetTweet = (tweetID: string) => {
  const {
    data: tweet,
    isLoading: isLoadingTweet,
    error: errorTweet,
  } = useQuery({
    queryKey: ['tweet', tweetID],
    queryFn: () => getTweetFn(tweetID),
  });
  return { tweet, isLoadingTweet, errorTweet };
};
