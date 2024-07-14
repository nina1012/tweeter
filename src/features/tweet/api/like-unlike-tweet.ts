import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

// LIKE TWEET

export const likeTweetFn = async (
  tweetID: string,
  userID: string,
): Promise<Tweet | null> => {
  const { data, error } = await supabase.rpc('like_tweet', {
    p_tweet_id: tweetID,
    p_user_id: userID,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useLikeTweet = () => {
  const mutationFn = async ({
    tweetID,
    userID,
  }: {
    tweetID: string;
    userID: string;
  }) => {
    return likeTweetFn(tweetID, userID);
  };

  const {
    mutate: likeTweet,
    isPending,
    error,
  } = useMutation({
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

// UNLIKE TWEET
export const unlikeTweetFn = async (
  tweetID: string,
  userID: string,
): Promise<Tweet | null> => {
  const { data, error } = await supabase.rpc('unlike_tweet', {
    p_tweet_id: tweetID,
    p_user_id: userID,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUnlikeTweet = () => {
  const mutationFn = async ({
    tweetID,
    userID,
  }: {
    tweetID: string;
    userID: string;
  }) => {
    return unlikeTweetFn(tweetID, userID);
  };

  const {
    mutate: unlikeTweet,
    isPending,
    error,
  } = useMutation({
    mutationFn,
    mutationKey: ['tweets'],
    onSettled: () => {
      queryClient.invalidateQueries(['tweets'] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { unlikeTweet, isPending, error };
};
