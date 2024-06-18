import { useParams } from 'react-router-dom';

import { UserProfileSkeleton } from '@/components/ui/skeleton/user/UserProfileSkeleton';
import { useGetTweet } from '@/features/tweet/api/get-tweets';
import { useGetUserData } from '@/features/user/api/get-user-data';
import { UserBackground } from '@/features/user/components/UserBackground';
import { UserHeader } from '@/features/user/components/UserHeader';

export const ProfileRoute = () => {
  // using params in url to get userID
  const { userID } = useParams();
  const { userData, isLoadingUserData } = useGetUserData(userID as string);
  const { tweet } = useGetTweet();

  // here will be rendered UserProfileSkeleton that consists of many skeletons within itself
  if (isLoadingUserData) {
    return <UserProfileSkeleton />;
  }
  return (
    <div className="min-h-svh">
      <UserBackground userID={userData?.user_id as string} />
      <div className="container">
        <UserHeader userID={userData?.user_id as string} />
      </div>
      <div>{JSON.stringify(tweet)}</div>
    </div>
  );
};
