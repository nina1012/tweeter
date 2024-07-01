import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-current-user';
import { uploadImage } from '@/features/tweet/api/upload-image';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';
import { isFileList } from '@/utils/isFileList';

import { UpdatedUser, User } from '../types';

type updateUserDataProps = {
  userID: string;
  updatedData: Partial<UpdatedUser>;
};

export const updateUserFn = async ({
  userID,
  updatedData,
}: updateUserDataProps): Promise<User | null> => {
  if (!userID || !updatedData) return null;

  let newData: Partial<UpdatedUser | User> = {};
  let avatar_image_url, background_image_url;
  let avatarFile, backgroundFile; // these variables will keep track of reference to actual File that we should upload to bucket

  // if user updated their avatar image
  if (
    updatedData.avatar_image?.length &&
    isFileList(updatedData.avatar_image)
  ) {
    avatarFile = updatedData.avatar_image?.item(0);
    if (avatarFile) {
      // find the type of the image : .png, .gif, .jpeg ....
      const fileType = avatarFile.type.split('/').at(1);
      // create image name that will be at the end of the URL in user_images bucket
      const avatarImageName = `avatar_img_${Date.now()}.${fileType}`;
      avatar_image_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/user_images/${avatarImageName}`;

      await uploadImage({
        image: avatarFile,
        imageName: avatarImageName,
        bucketName: 'user_images',
      });
    }
  }

  // if user updated their background image
  if (
    updatedData?.background_image?.length &&
    isFileList(updatedData.background_image)
  ) {
    backgroundFile = updatedData.background_image.item(0);
    if (backgroundFile) {
      const fileType = backgroundFile.type.split('/').pop();
      const backgroundImageName = `background_img_${Date.now()}.${fileType}`;
      background_image_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/user_images/${backgroundImageName}`;

      await uploadImage({
        image: backgroundFile,
        imageName: backgroundImageName,
        bucketName: 'user_images',
      });
    }
  }

  newData = {
    avatar_image: avatar_image_url,
    background_image: background_image_url,
    username: updatedData.username,
    bio: updatedData.bio,
  };

  const { data, error } = await supabase
    .from('users')
    .update({ ...newData })
    .eq('user_id', userID)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const useUpdateUserData = () => {
  const { user } = useUser();
  const {
    mutate: updateUser,
    isPending: isPendingUpdateUser,
    error: errorUpdateUser,
  } = useMutation({
    mutationFn: (updatedData: UpdatedUser) =>
      updateUserFn({ updatedData: updatedData, userID: user?.id as string }),

    onSettled: () => {
      queryClient.invalidateQueries([
        'user',
        user?.id as string,
      ] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { updateUser, isPendingUpdateUser, errorUpdateUser };
};
