import { Skeleton } from '../skeleton';
import { TweetHeaderSkeleton } from '../tweet/TweetHeaderSketeon';

export const TweetViewSkeleton = () => {
  return (
    <div className="max-w-full rounded-md bg-white p-8 shadow-md">
      <TweetHeaderSkeleton />
      {/* text content */}
      <div className="mb-8 mt-9">
        {[1, 2, 3].map((item, i) => (
          <Skeleton
            key={`${item}-${i}`}
            className="mb-3 h-7 
           rounded-md"
          />
        ))}
        <Skeleton className="mb-0 h-7 w-9/12" />
      </div>
      {/* image */}
      <Skeleton className="mb-4 h-96 rounded-md" />
      {/* tweet statistics */}
      <div className="mb-3 flex items-center justify-end gap-6">
        {[1, 2, 3, 4].map((item, i) => (
          <Skeleton
            key={`${item}-${i}`}
            className="h-5 max-w-24 grow
           rounded-md"
          />
        ))}
      </div>
      {/* buttons */}
      <div className="mb-3 flex justify-between gap-3 border-b-[.5px] border-b-gray-200 pb-1 text-gray-700">
        {[1, 2, 3, 4].map((item, i) => (
          <Skeleton
            key={`${item}-${i}`}
            className="flex h-16 items-center justify-center"
          />
        ))}
      </div>
      {/* reply container */}
      <div className="flex gap-6">
        <Skeleton className="size-10 rounded-md" />
        <Skeleton className="h-12 grow rounded-md" />
      </div>
    </div>
  );
};
