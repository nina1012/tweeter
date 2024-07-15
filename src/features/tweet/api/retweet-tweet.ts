import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

type AddRetweetParams = {
  tweetID: string;
  userID: string;
  originalTweetID: string;
  originalAuthorID: string;
};

type RemoveRetweetParams = {
  tweetID: string;
  userID: string;
};

const addRetweetFn = async (
  params: AddRetweetParams,
): Promise<Tweet | null> => {
  const { tweetID, userID, originalTweetID, originalAuthorID } = params;
  const { data, error } = await supabase.rpc('add_retweet', {
    p_tweet_id: tweetID,
    p_user_id: userID,
    p_original_tweet_id: originalTweetID,
    p_original_author_id: originalAuthorID,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const removeRetweetFn = async (params: RemoveRetweetParams): Promise<null> => {
  const { tweetID, userID } = params;
  const { data, error } = await supabase.rpc('remove_retweet', {
    p_tweet_id: tweetID,
    p_user_id: userID,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useAddRetweet = () => {
  const mutationFn = async (params: AddRetweetParams) => {
    return addRetweetFn(params);
  };

  const {
    mutate: addRetweet,
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
  return { addRetweet, isPending, error };
};

export const useRemoveRetweet = () => {
  const mutationFn = async (params: RemoveRetweetParams) => {
    return removeRetweetFn(params);
  };

  const {
    mutate: removeRetweet,
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
  return { removeRetweet, isPending, error };
};
