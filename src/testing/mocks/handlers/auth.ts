import { StringQuery } from '@mswjs/data/lib/query/queryTypes';
import { http, HttpResponse } from 'msw';

import { db, persistDB } from '../db';
import { hash, networkDelay } from '../utils';

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export const authHandlers = [
  // registration
  http.post(
    `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`,
    async ({ request }) => {
      await networkDelay();
      try {
        const user = (await request.json()) as RegisterCredentials;
        console.log(user);

        const userInDB = db.user.findFirst({
          where: {
            email: user.email as Partial<StringQuery>,
          },
        });

        if (userInDB) {
          return HttpResponse.json(
            { message: 'The user already exists' },
            { status: 400 },
          );
        }

        db.user.create({
          ...user,
          password: hash(user.password),
        });

        await persistDB('user');

        return HttpResponse.json(
          {
            data: {
              user: { email: user.email, password: user.password },
              session: {
                access_token: 'mock_access_token',
                refresh_token: 'mock_refresh_token',
              },
            },
          },
          { status: 201 },
        );
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server error' },
          { status: 500 },
        );
      }
    },
  ),

  // login
  http.post(
    `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token`,
    async ({ request }) => {
      await networkDelay();
      const { email, password } = (await request.json()) as LoginCredentials;
      if (!email || !password)
        return HttpResponse.json(
          { error: 'Enter credentials!' },
          { status: 401 },
        );

      return HttpResponse.json(
        {
          data: {
            user: { email, password },
            session: {
              access_token: 'mock_access_token',
              refresh_token: 'mock_refresh_token',
            },
          },
        },
        {
          status: 201,
        },
      );
    },
  ),
];
