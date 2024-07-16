import clsx from 'clsx';
import { Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/api/get-current-user';

import { useAddBookmark, useRemoveBookmark } from '../api/bookmark-tweet';
import { Tweet } from '../types';

export type TweetBookmarkButtonProps = {
  tweet: Tweet;
};

export const TweetBookmarkButton = ({ tweet }: TweetBookmarkButtonProps) => {
  const { user } = useUser();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  useEffect(() => {
    if (tweet.bookmarks && user?.id) {
      setIsBookmarked(tweet.bookmarks.includes(user?.id));
    }
  }, [tweet.bookmarks, user]);
  const { addBookmark } = useAddBookmark();
  const { removeBookmark } = useRemoveBookmark();

  const handleClick = () => {
    if (!tweet || !user) return;
    if (isBookmarked) {
      removeBookmark({ tweetID: tweet.tweet_id as string, userID: user?.id });
      setIsBookmarked(false);
    } else {
      addBookmark({ tweetID: tweet.tweet_id as string, userID: user?.id });
      setIsBookmarked(true);
    }
  };
  return (
    <Button
      variant="ghost"
      className={clsx(isBookmarked && 'text-blue-500', 'tweet-button')}
      onClick={handleClick}
    >
      <Bookmark />
      <span className="tweet-button-icon">Saved</span>
    </Button>
  );
};
