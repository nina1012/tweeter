import { motion } from 'framer-motion';
import { SaveIcon, X } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { User } from '../../user/types';

import { UserModalAvatarImage } from './UserModalAvatarImage';
import { UserModalBackgroundImage } from './UserModalBackgroundImage';
import { UserModalSkeleton } from './UserModalSkeleton';

export type UserModalProps = {
  userData: User | null | undefined;
  onClose: () => void;
};

export const editUserProfileSchema = z.object({
  backgroundImage: z
    .instanceof(FileList)
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true; // Allow empty FileList
    }, 'File must be a PNG'),
  avatarImage: z.instanceof(FileList).optional(),
  name: z.string(),
  bio: z.string(),
});

export const UserModal = ({ userData, onClose }: UserModalProps) => {
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
          onSubmit={(values) => {
            console.log(values);
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
                      error={formState.errors.backgroundImage}
                      registration={register('backgroundImage')}
                    />
                    <div className=" grid grid-cols-[150px,1fr] gap-5">
                      <div className="">
                        <UserModalAvatarImage
                          avatarImage={userData?.avatar_image as string}
                          error={formState.errors.avatarImage}
                          registration={register('avatarImage')}
                        />
                      </div>
                      {/* name and description input fields */}
                      <div className="flex w-full flex-col gap-2 border-l border-gray-200 pl-5">
                        <Input
                          type="text"
                          registration={register('name')}
                          id="name"
                          placeholder="First and last name"
                          defaultValue={
                            userData?.firstName + ' ' + userData?.lastName
                          }
                          label="First and last name:"
                        />
                        <Textarea
                          className=""
                          registration={register('bio')}
                          placeholder="Bio:"
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
