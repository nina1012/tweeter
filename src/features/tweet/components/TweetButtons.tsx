import { MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Tweet } from '../types';

import { TweetBookmarkButton } from './action-buttons/components/TweetBookmarkButton';
import { TweetLikeButton } from './action-buttons/components/TweetLikeButton';
import { TweetRetweetButton } from './action-buttons/components/TweetRetweetButton';

export type TweetButtonsProps = {
  tweet: Tweet;
};
export const TweetButtons = ({ tweet }: TweetButtonsProps) => {
  //  for now, only UI is done, I will implement actions
  if (!tweet) return;
  return (
    <div className="mb-3 flex justify-between gap-3 border-b-[.5px] border-b-gray-200 pb-1 text-gray-700">
      <TweetLikeButton tweet={tweet} />
      <TweetRetweetButton tweet={tweet} />
      <Button variant="ghost" className="tweet-button">
        <MessageSquare />
        <span className="tweet-button-icon">Reply</span>
      </Button>
      <TweetBookmarkButton tweet={tweet} />
    </div>
  );
};
