import { useState } from 'react';

import { useFetchTweets } from '@/features/tweet/api/fetch-tweets';
import { TweetList } from '@/features/tweet/components/TweetList';
import { Tweet } from '@/features/tweet/types';

import { TweetListSkeleton } from '../skeleton/tweet/TweetListSkeleton';

import { TweetsFilter } from './TweetsFilter';

export type FilterAndTweetsContainerProps = {
  fetchTweets: (
    filter: 'tweets' | 'replies' | 'media' | 'likes',
  ) => Promise<Tweet[]>;
  queryKey: any[];
  initialFilter?: 'tweets' | 'replies' | 'media' | 'likes';
};

export const FilterAndTweetsContainer = ({
  fetchTweets,
  queryKey,
  initialFilter = 'tweets',
}: FilterAndTweetsContainerProps) => {
  const [filter, setFilter] = useState<
    'tweets' | 'replies' | 'media' | 'likes'
  >(initialFilter);

  const { tweets, isLoading, error } = useFetchTweets(
    () => fetchTweets(filter),
    [...queryKey, filter],
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[min-content] items-start justify-start gap-8 md:grid-cols-[20rem,minmax(25rem,1fr)] md:justify-center">
      <TweetsFilter handleFilter={setFilter} filter={filter} />
      {isLoading ? <TweetListSkeleton /> : <TweetList tweets={tweets} />}
    </div>
  );
};
