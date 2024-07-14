import clsx from 'clsx';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/api/get-current-user';

import { useLikeTweet, useUnlikeTweet } from '../api/like-unlike-tweet';
import { Tweet } from '../types';
export type TweetLikeButtonProps = {
  tweet: Tweet;
};

export const TweetLikeButton = ({ tweet }: TweetLikeButtonProps) => {
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    // Ensure tweet.likes and user?.id are available at the initial render
    if (tweet.likes && user?.id) {
      setIsLiked(tweet.likes.includes(user.id));
    }
  }, [tweet.likes, user?.id]);

  const { likeTweet } = useLikeTweet();
  const { unlikeTweet } = useUnlikeTweet();

  const handleLike = () => {
    likeTweet({
      tweetID: tweet.tweet_id as string,
      userID: user?.id as string,
    });
    setIsLiked(true);
  };
  const handleUnlike = () => {
    unlikeTweet({
      tweetID: tweet.tweet_id as string,
      userID: user?.id as string,
    });
    setIsLiked(false);
  };
  return (
    <Button
      variant="ghost"
      className={clsx(isLiked && 'text-red-500', 'tweet-button')}
      onClick={isLiked ? handleUnlike : handleLike}
    >
      <Heart />
      <span className="tweet-button-icon">Liked</span>
    </Button>
  );
};
