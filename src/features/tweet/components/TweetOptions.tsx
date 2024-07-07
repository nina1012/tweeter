import { Edit, Ellipsis, Trash } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteTweet } from '../api/delete-tweet';
import { Tweet } from '../types';

export type TweetOptionsProps = {
  tweet: Tweet;
};
export const TweetOptions = ({ tweet }: TweetOptionsProps) => {
  const { removeTweet } = useDeleteTweet();
  const { addNotification } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1000] flex flex-col !font-normal !text-gray-700 opacity-100">
        <DropdownMenuItem
          onClick={() => {
            if (!tweet.tweet_id) return;
            removeTweet({
              tweetID: tweet.tweet_id,
              originalAuthorID: tweet.original_author_id,
            });
            addNotification({
              title: 'Deleted tweet',
              type: 'success',
              message: 'You successfully deleted a tweet',
            });
          }}
          className="text-red-500"
        >
          <Trash />
          <DropdownMenuLabel>Delete</DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit />
          <DropdownMenuLabel>Edit</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
