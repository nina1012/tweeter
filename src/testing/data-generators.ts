import {
  randFirstName,
  randLastName,
  randUserName,
  randUuid,
} from '@ngneat/falso';

import { User } from '@/features/user/types';

const generateUser = (): Partial<User> => ({
  user_id: randUuid() + Math.random(),
  firstName: randFirstName({ withAccents: false }),
  lastName: randLastName({ withAccents: false }),
  username: randUserName(),
  bio: '',
  created_at: new Date(),
});

export const createUser = () => {
  return { ...generateUser() };
};
