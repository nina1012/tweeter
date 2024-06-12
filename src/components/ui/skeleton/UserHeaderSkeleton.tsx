import { Skeleton } from './skeleton';

export const UserHeaderSkeleton = () => {
  return (
    <div className="relative -top-10 -mb-14 flex gap-8 rounded-md bg-white p-8 shadow-md">
      <div className="relative -top-20 overflow-hidden rounded-xl bg-white">
        <Skeleton
          className="size-40  border-4 border-white object-cover object-center shadow-md
        "
        />
      </div>
      <div className="">
        <div className="mb-5 flex flex-col items-center justify-center gap-1 md:mb-10 md:flex-row md:justify-between md:gap-10">
          {/* user's first and last name and username */}
          <div>
            <Skeleton className="h-5 w-40" />
            {/* <p className="text-sm text-gray-600">@{username}</p> */}
          </div>
          {/* user's following and followers counts */}
          {/* <div className="flex gap-6 text-xs">
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
          </div> */}
        </div>
        {/* user's bio */}
        {/* <div className="mb-4 w-full text-center text-base font-medium leading-4 tracking-tight md:max-w-sm md:text-left">
          {bio ? <p>{bio}</p> : <p>User has not added a bio yet</p>}
        </div> */}
      </div>
    </div>
  );
};
