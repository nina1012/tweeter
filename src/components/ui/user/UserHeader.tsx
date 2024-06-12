import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

// eslint-disable-next-line no-restricted-imports
import { useGetUserData } from '@/features/user/api/get-user-data';
import { formatNumber } from '@/utils/formatNumbers';

import { UserHeaderSkeleton } from '../skeleton/UserHeaderSkeleton';

type UserHeaderProps = {
  userID: string;
};

export const UserHeader = ({ userID }: UserHeaderProps) => {
  const { userData, isLoadingUserData } = useGetUserData(userID);

  if (!isLoadingUserData) {
    return <UserHeaderSkeleton />;
  }

  if (!userData) return;
  const {
    avatar_image,
    firstName,
    lastName,
    following_count,
    followers_count,
    bio,
  } = userData;

  return (
    <div className="relative -top-10 -mb-14 flex gap-8 rounded-md bg-white px-8 py-3 shadow-md">
      <Avatar>
        <AvatarImage
          src={avatar_image}
          className="relative -top-20 size-40 rounded-xl border-4 border-white bg-gray-500
 object-cover object-center shadow-md
        "
        />
      </Avatar>
      <div className="">
        <div className="mb-5 flex flex-col items-center justify-center gap-1 md:mb-10 md:flex-row md:justify-between md:gap-10">
          {/* user's first and last name and username */}
          <div>
            <p className="text-2xl font-semibold tracking-tighter	">
              {firstName} {lastName}
            </p>
            {/* <p className="text-sm text-gray-600">@{username}</p> */}
          </div>
          {/* user's following and followers counts */}
          <div className="flex gap-6 text-xs">
            <div>
              <span className="text-sm font-semibold">
                {formatNumber(following_count)}
              </span>{' '}
              following
            </div>
            <div>
              <span className="text-sm font-semibold">
                {formatNumber(followers_count)}{' '}
              </span>
              followers
            </div>
          </div>
        </div>
        {/* user's bio */}
        <div className="mb-4 w-full text-center text-base font-medium leading-4 tracking-tight md:max-w-sm md:text-left">
          {bio ? <p>{bio}</p> : <p>User has not added a bio yet</p>}
        </div>
      </div>
    </div>
  );
};
