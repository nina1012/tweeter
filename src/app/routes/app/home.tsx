import { HomeTweets } from '@/features/tweet/components/HomeTweets';
import { PublishTweet } from '@/features/tweet/components/PublishTweet';

export const HomeFeedRoute = () => {
  return (
    <div className="container mt-10 grid min-h-svh grid-cols-1 justify-center gap-0 md:mt-6 md:grid-cols-[46.5rem,1fr] md:gap-10 ">
      {/* main content */}
      <div>
        <PublishTweet />
        <HomeTweets />
      </div>
      {/* side content */}
      <div>
        <div>Hashtag trends</div>
        <div>Who to follow</div>
      </div>
    </div>
  );
};
