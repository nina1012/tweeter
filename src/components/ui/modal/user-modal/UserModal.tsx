import { motion } from 'framer-motion';
import { SaveIcon, X } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useUpdateUserData } from '@/features/user/api/update-user-data';
import { UpdatedUser, User } from '@/features/user/types';

import { Textarea } from '../../form/textarea';

import { UserModalAvatarImage } from './UserModalAvatarImage';
import { UserModalBackgroundImage } from './UserModalBackgroundImage';
import { UserModalSkeleton } from './UserModalSkeleton';

export type UserModalProps = {
  userData: User | null | undefined;
  onClose: () => void;
};

export const editUserProfileSchema = z.object({
  background_image: z.instanceof(FileList).optional(),
  avatar_image: z.instanceof(FileList).optional(),
  username: z.string(),
  bio: z.string(),
});

export const UserModal = ({ userData, onClose }: UserModalProps) => {
  const { updateUser } = useUpdateUserData();
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-transparent/40"
    >
      <div className="mx-5 w-full max-w-xl rounded-md border-[0.5px] border-gray-500/5 bg-white p-6 shadow-md md:mx-32">
        <Form
          onSubmit={(values: UpdatedUser) => {
            // TO DO update user's info
            console.log(values);
            updateUser(values);
            onClose();
          }}
          schema={editUserProfileSchema}
          options={{
            shouldUnregister: true,
          }}
        >
          {({ register, formState }) => {
            return (
              <>
                {/* modal header */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Button onClick={onClose} variant="ghost" size="icon">
                      <X />
                    </Button>
                    <h3
                      className=" text-lg
  font-semibold capitalize text-neutral-600"
                    >
                      edit profile
                    </h3>
                  </div>
                  {/* when saving, show a spinner */}
                  <Button type="submit" className="flex gap-1">
                    <SaveIcon /> save
                    {/* {isPending && <Spinner size="sm" />} save */}
                  </Button>
                </div>
                <hr />
                {/* modal content */}
                {userData ? (
                  <>
                    <UserModalBackgroundImage
                      userData={userData}
                      error={formState.errors.background_image}
                      registration={register('background_image')}
                    />
                    <div className="grid grid-rows-1 gap-5 md:grid-cols-[150px,1fr]">
                      <div className="flex items-center justify-center">
                        <UserModalAvatarImage
                          avatar_image={userData?.avatar_image}
                          error={formState.errors.avatar_image}
                          registration={register('avatar_image')}
                        />
                      </div>
                      {/* name and description input fields */}
                      <div className="flex w-full flex-col gap-2 border-l border-gray-200 pl-5">
                        <Input
                          type="text"
                          registration={register('username')}
                          id="username"
                          placeholder="Username:"
                          defaultValue={userData?.username}
                          label="First and last name:"
                        />
                        <Textarea
                          className=""
                          registration={register('bio')}
                          placeholder="Bio:"
                          label="Bio:"
                          defaultValue={userData?.bio}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <UserModalSkeleton />
                )}
              </>
            );
          }}
        </Form>
      </div>
    </motion.div>
  );
};
