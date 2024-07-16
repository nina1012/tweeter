import { HomeSkeleton } from '@/components/ui/skeleton/home/HomeSkeleton';

import { useAllTweets } from '../api/get-all-tweets';

import { TweetCard } from './TweetCard';

export const HomeTweets = () => {
  const { tweets, isLoadingTweets } = useAllTweets();
  if (isLoadingTweets) {
    return <HomeSkeleton />;
  }
  return (
    <div className="flex flex-col justify-start gap-9">
      {tweets?.map((tweet) => {
        return <TweetCard tweet={tweet} key={tweet.tweet_id} />;
      })}
    </div>
  );
};
