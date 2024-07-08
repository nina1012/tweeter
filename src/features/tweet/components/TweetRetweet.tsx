import { useGetUserData } from '@/features/user/api/get-user-data';
import { formatDate } from '@/utils/formatNumbers';

import { useGetTweet } from '../api/get-tweet';

export type TweetRetweetProps = {
  originalAuthorID: string;
  originalTweetID: string;
};
export const TweetRetweet = ({
  originalAuthorID,
  originalTweetID,
}: TweetRetweetProps) => {
  const { userData, isLoadingUserData } = useGetUserData(originalAuthorID);
  const { tweet, isLoadingTweet, errorTweet } = useGetTweet(originalTweetID);

  if (isLoadingUserData || isLoadingTweet) {
    return <div>TweetRetweetSkeleton...</div>;
  }
  if (!tweet) return;

  if (errorTweet) {
    throw new Error(errorTweet.message);
  }

  return (
    <div className="ml-14 border-l-2 border-l-gray-300 pl-8">
      {/* header */}
      <div className="mb-5 flex items-center gap-4 text-xs font-medium tracking-tight text-gray-300">
        <p className="text-gray-400">
          {userData?.firstName + ' ' + userData?.lastName}
        </p>
        <p>{formatDate(tweet?.created_at)}</p>
      </div>
      {/* content */}
      <div className="mb-5">
        <p
          className="
        mb-8 text-base leading-6 tracking-tight text-gray-500
        "
        >
          {tweet.content}
        </p>
        {tweet.image && (
          <img
            className="mb-5 h-auto w-full rounded-md"
            src={tweet.image as unknown as string}
            alt="not available at the moment"
          />
        )}
      </div>
    </div>
  );
};
