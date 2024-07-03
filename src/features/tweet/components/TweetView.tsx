import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '@/features/auth/api/get-current-user';
import { useGetUserData } from '@/features/user/api/get-user-data';
import { formatDate } from '@/utils/formatNumbers';

import { Tweet } from '../types';

export type TweetViewProps = {
  tweet: Tweet;
};

export const TweetView = memo(function TweetView({ tweet }: TweetViewProps) {
  const { userData } = useGetUserData(tweet.author_id);
  const { user: currentUser } = useUser();

  if (!tweet) return;
  if (!userData) return;
  const { avatar_image, user_id, firstName, lastName } = userData;
  const isCurrentUser: boolean = currentUser?.id === userData.user_id;
  return (
    <motion.div
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
      {/* tweet header */}
      <div className="mb-20 grid grid-cols-[4rem,1fr] grid-rows-[auto,auto] gap-x-5">
        {/* avatar cont */}
        <div className="size-full">
          {!avatar_image ? (
            <Avatar>
              <AvatarImage
                className="size-10 rounded-md"
                src={userData?.avatar_image}
              />
            </Avatar>
          ) : (
            <div className="size-full rounded-md bg-gray-200"></div>
          )}
        </div>
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
          <p className="text-xs font-medium tracking-tight text-gray-400">
            {formatDate(tweet.created_at)}
          </p>
        </div>
      </div>
    </motion.div>
  );
});
