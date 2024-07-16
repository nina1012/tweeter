import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

type BookmarkTweetParams = {
  tweetID: string;
  userID: string;
};

const addBookmarkFn = async (params: BookmarkTweetParams) => {
  const { tweetID, userID } = params;
  const { data, error } = await supabase.rpc('add_bookmark', {
    p_tweet_id: tweetID,
    p_user_id: userID,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const removeBookmarkFn = async (params: BookmarkTweetParams) => {
  const { tweetID, userID } = params;
  const { data, error } = await supabase.rpc('remove_bookmark', {
    p_tweet_id: tweetID,
    p_user_id: userID,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useAddBookmark = () => {
  const mutationFn = async (params: BookmarkTweetParams) => {
    return addBookmarkFn(params);
  };
  const {
    mutate: addBookmark,
    isPending,
    error,
  } = useMutation({
    mutationFn,
    mutationKey: ['tweets'],
    onSettled: () => {
      queryClient.invalidateQueries([
        'tweets',
        'users',
      ] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { addBookmark, isPending, error };
};

export const useRemoveBookmark = () => {
  const mutationFn = async (params: BookmarkTweetParams) => {
    return removeBookmarkFn(params);
  };
  const {
    mutate: removeBookmark,
    isPending,
    error,
  } = useMutation({
    mutationFn,
    mutationKey: ['tweets'],
    onSettled: () => {
      queryClient.invalidateQueries([
        'tweets',
        'users',
      ] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { removeBookmark, isPending, error };
};
