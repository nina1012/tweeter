import { useAllTweets } from '../api/get-all-tweets';

import { TweetView } from './TweetView';

export const HomeTweets = () => {
  const { tweets, isLoadingTweets } = useAllTweets();
  if (isLoadingTweets) {
    return <div>home skeleton goes here...</div>;
  }
  return (
    <div className="flex flex-col justify-start gap-9">
      {tweets?.map((tweet) => {
        return <TweetView tweet={tweet} key={tweet.tweet_id} />;
      })}
    </div>
  );
};
