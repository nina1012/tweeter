import { AnimatePresence, motion } from 'framer-motion';
import { Repeat2 } from 'lucide-react';
import { memo } from 'react';

import { useUser } from '@/features/auth/api/get-current-user';
import { useGetUserData } from '@/features/user/api/get-user-data';
import { formatNumber } from '@/utils/formatNumbers';

import { Tweet } from '../types';

import { TweetReply } from './reply/components/TweetReply';
import { TweetReplyInput } from './reply/components/TweetReplyInput';
import { TweetButtons } from './TweetButtons';
import { TweetHeader } from './TweetHeader';

export type TweetCardProps = {
  tweet: Tweet;
};

// this component will not be rerendered even its' parent rerender, as long as it gets the same props
export const TweetCard = memo(function TweetView({ tweet }: TweetCardProps) {
  const { user } = useUser();
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
    bookmarks,
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
      {is_retweet && user && retweets.includes(user?.id) && (
        <p className="mb-2 flex items-center gap-1 text-xs text-gray-400">
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
          {formatNumber(bookmarks.length)} saved
        </p>
      </div>
      {/* tweet button */}
      <TweetButtons tweet={tweet} />
      <TweetReplyInput tweet={tweet} />

      {tweet?.replies?.length > 0 && (
        <div className="mt-4 flex flex-col gap-6 border-t-[.1rem] border-t-gray-600 px-6">
          <AnimatePresence>
            {tweet.replies.map((reply, index) => (
              <div key={`${index}-${reply}-reply`}>this is a reply</div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.article>
  );
});
