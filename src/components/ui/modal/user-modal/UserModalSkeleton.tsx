import { Skeleton } from '@/components/ui/skeleton/skeleton';

export const UserModalSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* background image skeleton */}
      <Skeleton className="h-40 w-full" />
      <hr />
      {/* modal content */}
      <div className="grid grid-cols-[150px,1fr] gap-8">
        {/* avatar */}
        <Skeleton className="size-20 md:size-40" />
        {/* name and bio inputs */}
        <div className="flex w-full flex-col gap-2 border-l border-gray-200 pl-5">
          <Skeleton className="h-8 w-10/12" />
          <div>
            <Skeleton className="h-auto min-h-24 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
