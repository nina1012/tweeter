import { FilterAndTweetsContainer } from '@/components/ui/common/FilterAndTweetsContainer';
import { useUser } from '@/features/auth/api/get-current-user';
import { getBookmarks } from '@/features/user/api/get-bookmarks';

export const BookmarkRoute = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="container my-14 flex flex-col md:flex-row">
      <FilterAndTweetsContainer
        fetchTweets={(filter) => getBookmarks(user.id, filter)}
        queryKey={['userBookmarks', user.id]}
      />
    </div>
  );
};
