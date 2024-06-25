// import { useRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/form';

export type PublishTweetInputProps = {
  register: UseFormRegister<FieldValues>;
};

export const PublishTweetInput = ({ register }: PublishTweetInputProps) => {
  //   const inputRef = useRef(null);

  return (
    <div className="relative">
      <Input
        // ref={(e) => {
        //   ref(e);
        //   inputRef.current = e;
        // }}
        type="text"
        registration={register('content')}
        placeholder="What's happening?"
        className=" w-full select-text resize-none flex-col !overflow-hidden border-none bg-none p-0 text-base font-medium focus-visible:ring-white"
      />
    </div>
  );
};
