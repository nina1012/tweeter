import { Skeleton } from '../skeleton';

export const UserHeaderSkeleton = () => {
  return (
    <>
      {/* background skeleton */}
      <Skeleton className="-mt-8 h-72 w-full bg-zinc-200" />;
      {/* actual content's skeleton */}
      <div className="container">
        <div className="relative -mb-14 flex flex-col gap-0 rounded-md bg-white px-4 shadow-md md:-top-16 md:flex-row md:flex-wrap md:gap-8">
          <div className="mx-auto size-20 bg-white md:mx-0 md:size-40">
            <Skeleton
              className="relative -top-12 size-20 rounded-xl border-4 border-white md:size-40
        "
            />
          </div>
          <div className="-mt-5 flex flex-col items-center gap-4 md:mt-0 md:items-start md:justify-evenly">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* first and last name skeleton */}
              <Skeleton className="h-8 w-40" />
              {/* following and followed counts skeletons */}
              <div className="flex justify-center gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            {/* description skeleton */}
            <div className="mb-4 flex flex-col items-center gap-2 md:items-start">
              <Skeleton className="h-4 w-96" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
