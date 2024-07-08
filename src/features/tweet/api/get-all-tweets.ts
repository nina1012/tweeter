import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

export const getAllTweetsFn = async (): Promise<Tweet[] | null> => {
  const { data, error } = await supabase.from('tweets').select();
  if (error) throw new Error(error.message);
  return data;
};

export const useAllTweets = () => {
  const {
    data: tweets,
    isLoading: isLoadingTweets,
    error: userDataError,
  } = useQuery({
    queryKey: ['tweets'],
    queryFn: () => getAllTweetsFn(),
  });

  return { tweets, isLoadingTweets, userDataError };
};
