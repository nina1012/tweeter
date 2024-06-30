import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-current-user';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { UpdatedUser } from '../types';

type updateUserDataProps = {
  userID: string;
  updatedData: UpdatedUser;
};

export const updateUserFn = async ({
  userID,
  updatedData,
}: updateUserDataProps) => {
  if (!userID) return null;
  let newData = {};
  const avatar_image_url = '';
  const background_image_url = '';

  // if user updated their avatar image
  // if (updatedData.avatar_image && updatedData.avatar_image.length > 0) {
  //   const imageFile = updatedData.avatar_image.item(0);
  //   const imageName = `avatar_img_${updatedData.username}_${Date.now()}_${imageFile?.name}`;
  //   avatar_image_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/user_images/${imageName}`;

  //   if (!imageFile) return;
  //   await uploadImage({
  //     image: imageFile,
  //     imageName,
  //     bucketName: 'user_images',
  //   });
  // }

  // if user updated their avatar image
  // if (updatedData.background_image && updatedData.background_image.length > 0) {
  //   const imageFile = updatedData.background_image.item(0);
  //   const imageName = `bg_img_${updatedData.username}_${Date.now()}_${imageFile?.name}`;

  //   background_image_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/user_images/${imageName}`;
  //   if (!imageFile) return;

  //   await uploadImage({
  //     image: imageFile,
  //     imageName,
  //     bucketName: 'user_images',
  //   });
  // }

  newData = {
    avatar_image: avatar_image_url || updatedData.avatar_image,
    background_image: background_image_url || updatedData.background_image,
    username: updatedData.username,
    bio: updatedData.bio,
  };

  const { data, error } = await supabase
    .from('users')
    .update({ ...newData })
    .eq('user_id', userID)
    .select();

  if (error) throw new Error(error.message);
  return data;
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
