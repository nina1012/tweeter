import { Skeleton } from '../skeleton';

export const PublishTweetSkeleton = () => {
  return (
    <div className="mb-4 min-h-40 w-full rounded-md bg-white px-5 py-2 shadow-md">
      <h3 className="mb-3 border-b-[0.1rem] border-b-gray-200 pb-2 text-xs font-semibold tracking-tighter text-gray-700">
        Tweet something
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="size-11" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-96" />
            <Skeleton className="h-5 w-80" />
          </div>
        </div>
        <div></div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-8 bg-transparent" />
            <Skeleton className="size-8" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};
