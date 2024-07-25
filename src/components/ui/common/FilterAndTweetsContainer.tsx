import { useState } from 'react';

import { TweetList } from '@/features/tweet/components/TweetList';
import { useUserBookmarks } from '@/features/user/api/get-bookmarks';

import { TweetsFilter } from './TweetsFilter';

export type FilterAndTweetsContainerProps = {
  isBookmark: boolean;
};

export const FilterAndTweetsContainer = ({
  isBookmark,
}: FilterAndTweetsContainerProps) => {
  // from this filter will depend which tweets(or media,replies or likes) will be displayed
  const [filter, setFilter] = useState<
    'tweets' | 'replies' | 'media' | 'likes'
  >('tweets');

  const { bookmarks, isLoading, error } = useUserBookmarks(filter);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[min-content] items-start justify-start gap-8 md:grid-cols-[20rem,minmax(25rem,1fr)] md:justify-center">
      <TweetsFilter
        handleFilter={setFilter}
        isBookmark={isBookmark}
        filter={filter}
      />
      <TweetList tweets={bookmarks} />
    </div>
  );
};
