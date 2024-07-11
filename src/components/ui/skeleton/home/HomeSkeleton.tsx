import { TweetViewSkeleton } from './TweetViewSkeleton';

export const HomeSkeleton = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-0 md:min-h-screen md:grid-cols-[46.5rem,1fr] md:gap-9">
      {/* main content */}
      <div className="flex w-full flex-col gap-9">
        {/* <PublishTweetSkeleton /> will be rendered from PublishTweet component*/}
        <TweetViewSkeleton />
        <TweetViewSkeleton />
        <TweetViewSkeleton />
      </div>
      {/* aside content */}
      <div className="hidden justify-start gap-7 md:flex md:flex-col">
        <div>Trending Skeleton</div>
        <div>Who to follow Skeleton</div>
      </div>
    </div>
  );
};
