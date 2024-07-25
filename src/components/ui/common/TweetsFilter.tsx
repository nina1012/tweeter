import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

export type TweetsFilterProps = {
  handleFilter: Dispatch<
    SetStateAction<'tweets' | 'replies' | 'media' | 'likes'>
  >;
  isBookmark?: boolean;
  filter: 'tweets' | 'replies' | 'media' | 'likes';
};

export const TweetsFilter = ({ handleFilter, filter }: TweetsFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.25 } }}
      className="relative flex w-full flex-col gap-8 rounded-md bg-white px-8 py-6 shadow-md"
    >
      {['tweets', 'replies', 'media', 'likes'].map((f) => {
        return (
          <button
            onClick={() =>
              handleFilter(f as 'tweets' | 'replies' | 'media' | 'likes')
            }
            key={`filter-${f}`}
            tabIndex={0}
            className={clsx(
              'cursor-pointer text-left text-sm font-semibold capitalize tracking-tight text-gray-500 transition-all',
              filter === f ? 'text-primary' : '',
            )}
          >
            {f}
          </button>
        );
      })}
    </motion.div>
  );
};
