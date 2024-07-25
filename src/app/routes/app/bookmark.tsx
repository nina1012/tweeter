import { TweetViewSkeleton } from '@/components/ui/skeleton/home/TweetViewSkeleton';
import { TweetList } from '@/features/tweet/components/TweetList';
import { useUserBookmarks } from '@/features/user/api/get-bookmarks';

export const BookmarkRoute = () => {
  const { bookmarks, isLoading, error } = useUserBookmarks();

  if (error) {
    return <div>Error loading bookmarks</div>;
  }
  return (
    <div className="container mt-10 grid min-h-svh grid-cols-1 justify-center gap-0 pb-10 md:mt-6 md:grid-cols-[46.5rem,1fr] md:gap-10">
      {isLoading ? <TweetViewSkeleton /> : <TweetList tweets={bookmarks} />}
    </div>
  );
};
