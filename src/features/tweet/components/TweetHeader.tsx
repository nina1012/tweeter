import { Link } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/features/auth/api/get-current-user';
import { useGetUserData } from '@/features/user/api/get-user-data';
import { formatDate } from '@/utils/formatNumbers';

import { Tweet } from '../types';

type TweetHeaderProps = {
  tweet: Tweet;
};

export const TweetHeader = ({ tweet }: TweetHeaderProps) => {
  const { userData } = useGetUserData(tweet.author_id);
  const { user: currentUser } = useUser();

  if (!userData) return;

  const { avatar_image, user_id, firstName, lastName } = userData;
  const isCurrentUser: boolean = currentUser?.id === userData.user_id;

  return (
    <div className="mb-2 grid grid-cols-[3.5rem,1fr] grid-rows-[auto,auto]">
      {/* avatar container */}
      <div className="size-full">
        {avatar_image ? (
          <Avatar className="rounded-md">
            <AvatarImage className="size-10" src={userData?.avatar_image} />
          </Avatar>
        ) : (
          <div className="size-full rounded-md bg-gray-200"></div>
        )}
      </div>
      {/* username and date container */}
      <div>
        <div className="flex justify-between">
          {/* username */}
          <Link
            to={`/app/${user_id}/`}
            className="w-fit cursor-pointer text-lg font-medium tracking-tight no-underline underline-offset-4 transition-all hover:text-gray-400 hover:underline"
          >
            {firstName + ' ' + lastName}
          </Link>
          {isCurrentUser && <div>options...</div>}
        </div>
        {/* date of creation */}
        <p className="text-xs font-medium tracking-tight text-gray-400">
          {formatDate(tweet.created_at)}
        </p>
      </div>
    </div>
  );
};
