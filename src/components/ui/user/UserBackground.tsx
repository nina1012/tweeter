/* eslint-disable no-restricted-imports */
import { useGetUserData } from '@/features/user/api/get-user-data';

import { UserBackgroundSkeleton } from '../skeleton/UserBackgroundSkeleton';

type UserBackgroundProps = {
  userID: string;
};
export const UserBackground = ({ userID }: UserBackgroundProps) => {
  const { userData, isLoadingUserData } = useGetUserData(userID);

  if (isLoadingUserData) {
    return <UserBackgroundSkeleton />;
  }

  return (
    <div className="pointer-events-none -mt-8 h-72">
      <img
        src={userData?.background_image}
        alt="Background"
        className="h-72 w-full object-cover object-center"
      />
    </div>
  );
};
