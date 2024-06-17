/* eslint-disable no-restricted-imports */
import { useParams } from 'react-router-dom';

import { UserProfileSkeleton } from '@/components/ui/skeleton/user/UserProfileSkeleton';
import { UserBackground } from '@/components/ui/user/UserBackground';
import { UserHeader } from '@/components/ui/user/UserHeader';
import { useGetUserData } from '@/features/user/api/get-user-data';

export const ProfileRoute = () => {
  // using params in url to get userID
  const { userID } = useParams();
  const { userData, isLoadingUserData } = useGetUserData(userID as string);

  // here will be rendered UserProfileSkeleton that consists of many skeletons within itself
  if (isLoadingUserData) {
    return <UserProfileSkeleton />;
  }
  return (
    <div className="min-h-svh">
      <UserBackground userID={userData?.user_id} />
      <div className="container">
        <UserHeader userID={userData?.user_id} />
      </div>
    </div>
  );
};
