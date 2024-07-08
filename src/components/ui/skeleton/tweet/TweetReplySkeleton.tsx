import { Skeleton } from '../skeleton';

export const TweetReplySkeleton = () => {
  return (
    <div className="mb-4 ml-14 border-l-2 border-l-gray-300 pl-8">
      <div className="mb-4 flex items-center">
        <Skeleton className="h-3 w-20 rounded-md" />
        <Skeleton className="ml-2 h-6 w-28 rounded-md" />
      </div>
      <div className="mb-8 ml-2">
        {[1, 2, 3].map((item, i) => (
          <Skeleton
            key={`${item}-${i}`}
            className="mb-3 h-7 
           rounded-md"
          />
        ))}
        <Skeleton className="mb-0 h-7 w-9/12" />
      </div>
      <Skeleton
        className="
        mb-4 h-64 w-full rounded-md 
"
      />
    </div>
  );
};
