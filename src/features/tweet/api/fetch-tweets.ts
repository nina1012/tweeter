import { useQuery } from '@tanstack/react-query';

import { Tweet } from '../types';

export const useFetchTweets = (
  fetchFn: () => Promise<Tweet[]>,
  queryKey: any[],
) => {
  const {
    data: tweets,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: fetchFn,
  });

  return { tweets, isLoading, error };
};
