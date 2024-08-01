import {
  randEmail,
  randFirstName,
  randLastName,
  randPassword,
  randUserName,
  randUuid,
} from '@ngneat/falso';

const generateUser = () => ({
  user_id: randUuid() + Math.random(),
  firstName: randFirstName({ withAccents: false }),
  lastName: randLastName({ withAccents: false }),
  username: randUserName(),
  bio: '',
  created_at: new Date(),
  email: randEmail(),
  password: randPassword(),
});

export const createUser = () => {
  return { ...generateUser() };
};
