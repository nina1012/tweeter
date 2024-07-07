import { Skeleton } from '../skeleton';

export const TweetHeaderSkeleton = () => {
  return (
    <div className="flex gap-6">
      <Skeleton className="size-10 rounded-md" />
      <div className="flex flex-col items-start">
        <Skeleton className="mb-2 h-8 w-48 rounded-md" />
        <Skeleton className="h-6 w-36 rounded-md" />
      </div>
    </div>
  );
};
