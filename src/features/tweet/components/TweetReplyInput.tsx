import { Tweet } from '../types';

export const TweetReplyInput = ({ tweet }: { tweet: Tweet }) => {
  if (!tweet) return;
  return <div>TweetReplyInput</div>;
};
