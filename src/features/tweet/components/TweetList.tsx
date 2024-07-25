import { Tweet } from '../types';

import { TweetCard } from './TweetCard';

type TweetListProps = {
  tweets?: Tweet[];
};

export const TweetList = ({ tweets }: TweetListProps) => {
  return (
    <div className="flex flex-col justify-start gap-9">
      {tweets?.map((tweet) => {
        return <TweetCard tweet={tweet} key={tweet.tweet_id} />;
      })}
    </div>
  );
};
