// import { useRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Textarea } from '@/components/ui/form/textarea';

export type PublishTweetInputProps = {
  registration: UseFormRegisterReturn<'content'>;
  error?: FieldError | null | undefined;
};

export const PublishTweetInput = ({ registration }: PublishTweetInputProps) => {
  return (
    <div className="relative flex flex-col items-start">
      <Textarea
        registration={registration}
        placeholder="What's happening?"
        className="min-h-10 w-full select-text resize-none !overflow-hidden border-none bg-none p-0 text-base font-medium placeholder:text-stone-300 focus-visible:ring-white"
        autoComplete="off"
      />
    </div>
  );
};
