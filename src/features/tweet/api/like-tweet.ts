import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

export type TweetLikeParams = {
  tweetID: string;
  userID: string;
};

export const likeTweetFn = async ({
  tweetID,
  userID,
}: TweetLikeParams): Promise<Tweet | null> => {
  const { data, error } = await supabase.rpc('like_tweet', {
    p_tweet_id: tweetID,
    p_user_id: userID,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const useLikeTweet = () => {
  const mutationFn = async (params: TweetLikeParams) => {
    return likeTweetFn(params);
  };

  const {
    mutate: likeTweet,
    isPending,
    error,
  } = useMutation<Tweet | null, Error, TweetLikeParams>({
    mutationFn,
    mutationKey: ['tweets'],
    onSettled: () => {
      queryClient.invalidateQueries(['tweets'] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { likeTweet, isPending, error };
};
