import { Bookmark, Heart, MessageSquare, Repeat2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Tweet } from '../types';

type TweetButtonsProps = {
  tweet: Tweet;
};
export const TweetButtons = ({ tweet }: TweetButtonsProps) => {
  console.log(tweet);
  //  for now, only UI is done, I will implement actions
  return (
    <div className=" mb-3 flex justify-between gap-3 border-b-[.5px] border-b-gray-200 pb-1">
      <Button variant="ghost" className="tweet-button">
        <MessageSquare />
        <span className="tweet-button-icon">Comment</span>
      </Button>
      <Button variant="ghost" className="tweet-button">
        <Repeat2 />
        <span className="tweet-button-icon">Retweeted</span>
      </Button>
      <Button variant="ghost" className="tweet-button">
        <Heart />
        <span className="tweet-button-icon">Liked</span>
      </Button>
      <Button variant="ghost" className="tweet-button">
        <Bookmark />
        <span className="tweet-button-icon">Saved</span>
      </Button>
    </div>
  );
};
