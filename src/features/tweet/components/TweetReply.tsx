import { Link } from 'react-router-dom';

import { TweetReplySkeleton } from '@/components/ui/skeleton/tweet/TweetReplySkeleton';
import { useGetUserData } from '@/features/user/api/get-user-data';

import { useGetTweet } from '../api/get-tweet';

export type TweetReplyProps = {
  originalAuthorID: string;
  originalTweetID: string;
};

export const TweetReply = ({
  originalAuthorID,
  originalTweetID,
}: TweetReplyProps) => {
  const { userData, isLoadingUserData } = useGetUserData(originalAuthorID);
  const { tweet, isLoadingTweet } = useGetTweet(originalTweetID);

  if (isLoadingUserData || isLoadingTweet) {
    return <TweetReplySkeleton />;
  }
  if (!tweet) {
    return <div>The original tweet does not exist</div>;
  }
  return (
    <div className="mb-4 ml-14 border-l-2 border-l-gray-300 pl-8">
      {/* the author of the original tweet */}
      <p className="mb-4 text-xs font-medium tracking-tight text-gray-300">
        replying to:
        <Link
          className="mb-2 font-semibold text-gray-400"
          to={`/app/${userData?.user_id}`}
        >
          {userData?.firstName + ' ' + userData?.lastName}{' '}
        </Link>
      </p>
      {/* */}
      <p className="mb-6 text-sm leading-6 tracking-tight text-gray-400">
        {tweet.content}
      </p>
      <img
        className="mb-5 h-auto w-full rounded-md"
        src={tweet.image as unknown as string}
        alt="not avaiable at the moment"
      />
    </div>
  );
};
