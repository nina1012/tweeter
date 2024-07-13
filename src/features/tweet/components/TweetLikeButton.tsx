import clsx from 'clsx';
import { Heart } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/api/get-current-user';

import { useLikeTweet } from '../api/like-tweet';
import { Tweet } from '../types';
export type TweetLikeButtonProps = {
  tweet: Tweet;
};

export const TweetLikeButton = ({ tweet }: TweetLikeButtonProps) => {
  const { user } = useUser();
  const { likeTweet } = useLikeTweet();

  const [isLiked, setIsLiked] = useState<boolean>(
    !!user && tweet.likes.includes(user?.id),
  );

  const handleLike = () => {
    likeTweet({
      tweetID: tweet.tweet_id as string,
      userID: user?.id as string,
    });
    setIsLiked(true);
    console.log('liked');
  };
  const handleUnlike = () => {
    console.log('unliked');
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
