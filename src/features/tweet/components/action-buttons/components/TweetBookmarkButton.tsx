import clsx from 'clsx';
import { Bookmark } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/api/get-current-user';
import {
  useAddBookmark,
  useRemoveBookmark,
} from '@/features/tweet/api/bookmark-tweet';
import { Tweet } from '@/features/tweet/types';

export type TweetBookmarkButtonProps = {
  tweet: Tweet;
};

export const TweetBookmarkButton = ({ tweet }: TweetBookmarkButtonProps) => {
  const { user } = useUser();

  const { addBookmark } = useAddBookmark();
  const { removeBookmark } = useRemoveBookmark();

  const isBookmarked =
    user?.id && tweet.bookmarks ? tweet.bookmarks.includes(user?.id) : false;

  const handleClick = () => {
    if (!tweet || !user) return;
    if (isBookmarked) {
      removeBookmark({ tweetID: tweet.tweet_id as string, userID: user?.id });
    } else {
      addBookmark({ tweetID: tweet.tweet_id as string, userID: user?.id });
    }
  };
  return (
    <Button
      variant="ghost"
      className={clsx(isBookmarked && 'text-blue-500', 'tweet-button')}
      onClick={handleClick}
    >
      <Bookmark />
      <span className="tweet-button-icon">
        {isBookmarked ? 'Saved' : 'Save'}
      </span>
    </Button>
  );
};
