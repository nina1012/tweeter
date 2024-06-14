import { Skeleton } from './skeleton';

export const UserHeaderSkeleton = () => {
  return (
    <div className="relative -mb-14 flex flex-col gap-0 rounded-md bg-white px-4 shadow-md md:-top-10 md:flex-row md:flex-wrap md:gap-8">
      <div className="mx-auto size-20 bg-white md:mx-0 md:size-40">
        <Skeleton
          className="relative -top-10 size-20 rounded-xl border-4 border-white md:size-40
        "
        />
      </div>
      <div className="-mt-5 flex flex-col items-center gap-4 md:mt-0 md:items-start md:justify-evenly">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Skeleton className="h-8 w-40" />
          <div className="flex justify-center gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        {/* description */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
    </div>
  );
};
