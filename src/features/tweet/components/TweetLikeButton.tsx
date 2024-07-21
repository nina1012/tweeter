import clsx from 'clsx';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/api/get-current-user';

import { useLikeTweet, useUnlikeTweet } from '../api/like-unlike-tweet';
import { Tweet } from '../types';
export type TweetLikeButtonProps = {
  tweet: Tweet;
};

export const TweetLikeButton = ({ tweet }: TweetLikeButtonProps) => {
  const { user } = useUser();

  const isLiked = user?.id ? tweet.likes.includes(user?.id) : false;

  const { likeTweet } = useLikeTweet();
  const { unlikeTweet } = useUnlikeTweet();

  const handleClick = () => {
    if (!tweet || !user) return;
    if (isLiked) {
      unlikeTweet({
        tweetID: tweet.tweet_id as string,
        userID: user?.id as string,
      });
    } else {
      likeTweet({
        tweetID: tweet.tweet_id as string,
        userID: user?.id as string,
      });
    }
  };

  return (
    <Button
      variant="ghost"
      className={clsx(isLiked && 'text-red-500', 'tweet-button')}
      onClick={handleClick}
    >
      <Heart />
      <span className="tweet-button-icon">{isLiked ? 'Liked' : 'Like'}</span>
    </Button>
  );
};
