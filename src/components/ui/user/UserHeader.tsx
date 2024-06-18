import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

import { useGetUserData } from '@/features/user/api/get-user-data';
import { formatNumber } from '@/utils/formatNumbers';

type UserHeaderProps = {
  userID: string;
};

export const UserHeader = ({ userID }: UserHeaderProps) => {
  const { userData } = useGetUserData(userID);

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
    <div className="relative -mb-14 flex flex-col gap-0 rounded-md bg-white px-4 shadow-md md:-top-10 md:flex-row md:gap-8">
      <div className="-mb-6 md:mb-0">
        <Avatar>
          <AvatarImage
            src={avatar_image}
            className="relative -top-10 mx-auto size-20 rounded-xl border-4 border-white bg-gray-500 object-cover object-center
 shadow-md md:-top-12 md:mx-0 md:size-40
        "
          />
        </Avatar>
      </div>
      <div className="flex flex-col justify-center md:gap-y-6">
        <div className="mb-5 flex flex-col items-center justify-center gap-2 text-center md:mb-0 md:flex-row md:justify-start md:gap-10  md:text-left">
          {/* user's first and last name and username */}
          <div className="">
            <p className="text-2xl font-semibold tracking-tighter	">
              {firstName} {lastName}
            </p>
          </div>
          {/* user's following and followers counts */}
          <div className="flex items-center gap-6 text-xs">
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
        <div className="mx-auto mb-4 w-8/12 text-center text-lg font-medium leading-6 tracking-tight text-gray-600 md:mx-0 md:mb-0 md:w-full md:max-w-md md:text-left">
          {bio ? <p>{bio}</p> : <p>User has not added a bio yet</p>}
        </div>
      </div>
    </div>
  );
};
