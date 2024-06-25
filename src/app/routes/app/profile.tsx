import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserModal } from '@/components/ui/modal/user-modal/UserModal';
import { ModalWrapper } from '@/components/ui/modal-wrapper';
import { UserProfileSkeleton } from '@/components/ui/skeleton/user/UserProfileSkeleton';
import { useGetUserData } from '@/features/user/api/get-user-data';
import { UserBackground } from '@/features/user/components/UserBackground';
import { UserHeader } from '@/features/user/components/UserHeader';

export const ProfileRoute = () => {
  // using params in url to get userID
  const { userID } = useParams();
  const { userData, isLoadingUserData } = useGetUserData(userID as string);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = (): void => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (): void => {
    setIsModalOpen(true);
  };

  // here will be rendered UserProfileSkeleton that consists of many skeletons within itself
  if (isLoadingUserData) {
    return <UserProfileSkeleton />;
  }
  return (
    <div className="relative min-h-svh">
      <UserBackground userID={userData?.user_id as string} />
      <div className="container">
        <UserHeader
          userID={userData?.user_id as string}
          handleEdit={handleModalOpen}
        />
      </div>
      {/* <div>{JSON.stringify(tweet)}</div> */}

      <ModalWrapper isVisible={isModalOpen}>
        <UserModal userData={userData} onClose={handleModalClose} />
      </ModalWrapper>
    </div>
  );
};
