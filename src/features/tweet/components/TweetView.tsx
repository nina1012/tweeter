import { motion } from 'framer-motion';
import { Repeat2 } from 'lucide-react';
import { memo } from 'react';

// import { useUser } from '@/features/auth/api/get-current-user';
import { useGetUserData } from '@/features/user/api/get-user-data';
import { formatNumber } from '@/utils/formatNumbers';

import { Tweet } from '../types';

import { TweetButtons } from './TweetButtons';
import { TweetHeader } from './TweetHeader';
import { TweetReply } from './TweetReply';
// import { TweetRetweet } from './TweetRetweet';

export type TweetViewProps = {
  tweet: Tweet;
};

// this component will not be rerendered even its' parent rerender, as long as it gets the same props
export const TweetView = memo(function TweetView({ tweet }: TweetViewProps) {
  // const { user } = useUser();
  const { userData } = useGetUserData(tweet.author_id);

  if (!tweet) return;
  if (!userData) return;
  const {
    is_reply,
    content,
    replies,
    image,
    is_retweet,
    likes,
    retweets,
    saves,
    original_author_id,
    original_tweet_id,
  } = tweet;

  return (
    <motion.article
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.2,
        },
      }}
      className="rounded-md bg-white p-8 shadow-md"
    >
      {is_retweet && (
        <p className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <Repeat2 />
          You retweeted
        </p>
      )}
      {/* tweet header */}
      <TweetHeader tweet={tweet} />
      {/* tweet content */}
      <div>
        {is_reply && (
          <TweetReply
            originalAuthorID={original_author_id as string}
            originalTweetID={original_tweet_id as string}
          />
        )}
        {content && (
          <p className="mb-8 mt-6 text-base font-normal leading-6 tracking-tight text-gray-600">
            {tweet.content}
          </p>
        )}
        {image && (
          <img
            className="mb-5 h-auto w-full rounded-md"
            src={image as unknown as string}
            alt="not avaiable at the moment"
          />
        )}
      </div>
      {/* retweet */}
      {/* {is_retweet && (
        <TweetRetweet
          originalAuthorID={user?.id as string}
          originalTweetID={original_tweet_id as string}
        />
      )} */}
      {/* tweet statistics */}
      <div className="mb-1 flex justify-end gap-6 border-b-[.5px] border-b-gray-200 pb-3">
        <p className="text-xs font-normal tracking-tight text-gray-400">
          {formatNumber(likes.length)} likes
        </p>
        <p className="text-xs font-normal tracking-tight text-gray-400">
          {formatNumber(replies.length)} replies
        </p>
        <p className="text-xs font-normal tracking-tight text-gray-400">
          {formatNumber(retweets.length)} retweets
        </p>
        <p className="text-xs font-normal tracking-tight text-gray-400">
          {formatNumber(saves.length)} saved
        </p>
      </div>
      {/* tweet button */}
      <TweetButtons tweet={tweet} />
    </motion.article>
  );
});
