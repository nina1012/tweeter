import clsx from 'clsx';
import { Repeat2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/api/get-current-user';

import { useAddRetweet, useRemoveRetweet } from '../api/retweet-tweet';
import { Tweet } from '../types';
export type TweetRetweetButtonProps = {
  tweet: Tweet;
};

export const TweetRetweetButton = ({ tweet }: TweetRetweetButtonProps) => {
  const { user } = useUser();
  const isRetweeted = user?.id ? tweet.bookmarks.includes(user?.id) : false;

  const { addRetweet } = useAddRetweet();
  const { removeRetweet } = useRemoveRetweet();

  const handleClick = () => {
    if (!tweet || !user) return;
    if (isRetweeted) {
      removeRetweet({ tweetID: tweet?.tweet_id as string, userID: user?.id });
    } else {
      addRetweet({
        tweetID: tweet?.tweet_id as string,
        userID: user?.id,
        originalAuthorID: tweet.original_author_id as string,
        originalTweetID: tweet.original_tweet_id as string,
      });
    }
  };

  return (
    <Button
      variant="ghost"
      className={clsx(isRetweeted && 'text-green-500', 'tweet-button')}
      onClick={handleClick}
    >
      <Repeat2 />
      <span className="tweet-button-icon">
        {isRetweeted ? 'Retweeted' : 'Retweet'}
      </span>
    </Button>
  );
};
