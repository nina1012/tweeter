import { motion } from 'framer-motion';
import { SaveIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { editUserProfileSchema } from '@/lib/auth';

import { User } from '../../user/types';

import { UserModalAvatarImage } from './UserModalAvatarImage';
import { UserModalBackgroundImage } from './UserModalBackgroundImage';

export type UserModalProps = {
  userData: User | null | undefined;
  onClose: () => void;
};
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
            console.log('submitted');

            console.log(values);
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
                <UserModalBackgroundImage
                  userData={userData}
                  error={formState.errors.backgroundImage}
                  registration={register('backgroundImage')}
                />
                <div className="container grid grid-cols-[150px,1fr]">
                  <UserModalAvatarImage
                    avatarImage={userData?.avatar_image as string}
                    error={formState.errors.avatarImage}
                    registration={register('avatarImage')}
                  />
                  {/* <UserModalNameAndBio userData={userData} /> */}
                </div>
              </>
            );
          }}
        </Form>
      </div>
    </motion.div>
  );
};
