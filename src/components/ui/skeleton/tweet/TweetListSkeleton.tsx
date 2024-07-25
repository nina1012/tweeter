import { Skeleton } from '../skeleton';

export const TweetListSkeleton = () => {
  return (
    <div className="rounded-md">
      <div className="flex flex-col gap-8 *:bg-white">
        <div>
          <Skeleton className="min-h-80 w-full rounded-md shadow-md" />
        </div>
        <div>
          <Skeleton className="min-h-80 w-full rounded-md shadow-md" />
        </div>
      </div>
    </div>
  );
};
