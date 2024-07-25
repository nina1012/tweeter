import { FilterAndTweetsContainer } from '@/components/ui/common/FilterAndTweetsContainer';

export const BookmarkRoute = () => {
  return (
    <div className="container my-14 flex flex-col md:flex-row">
      <FilterAndTweetsContainer isBookmark={true} />
    </div>
  );
};
