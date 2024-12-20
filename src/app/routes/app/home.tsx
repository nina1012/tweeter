import { HomeSkeleton } from '@/components/ui/skeleton/home/HomeSkeleton';
import { useAllTweets } from '@/features/tweet/api/get-all-tweets';
import { PublishTweet } from '@/features/tweet/components/PublishTweet';
import { TweetList } from '@/features/tweet/components/TweetList';
import { Tweet } from '@/features/tweet/types';

export const HomeFeedRoute = () => {
  const { tweets, isLoadingTweets } = useAllTweets();
  if (isLoadingTweets) {
    return <HomeSkeleton />;
  }
  return (
    <div className="container mt-10 grid min-h-svh grid-cols-1 justify-center gap-0 pb-10 md:mt-6 md:grid-cols-[46.5rem,1fr] md:gap-10 ">
      {/* main content */}
      <div className="mb-10 flex flex-col md:mb-0">
        <PublishTweet />
        <TweetList tweets={tweets as Tweet[]} />
      </div>
      {/* side content */}
      <div className="flex flex-col gap-8">
        <div className="min-h-96 w-full rounded-md bg-white px-5 py-2 shadow-md">
          <h3 className="heading3">Trends for you</h3>
        </div>
        <div className="min-h-96 w-full rounded-md bg-white px-5 py-2 shadow-md">
          <h3 className="heading3">Who to follow</h3>
        </div>
      </div>
    </div>
  );
};
