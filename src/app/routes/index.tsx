import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/lib/auth';

import { AppRoot } from './app/root';

export const createRouter = () =>
  createBrowserRouter([
    // these pages are available to everyone
    // landing page route
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/auth/register',
      lazy: async () => {
        const { RegisterRoute } = await import('./auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: ':userID',
          lazy: async () => {
            const { ProfileRoute } = await import('./app/profile');
            return { Component: ProfileRoute };
          },
        },
        // this route is different from the "/" route since this route will only be available to authenticated users
        {
          path: 'home',
          lazy: async () => {
            const { HomeFeedRoute } = await import('./app/home');
            return { Component: HomeFeedRoute };
          },
        },
        {
          path: 'bookmark',
          lazy: async () => {
            const { BookmarkRoute } = await import('./app/bookmark');
            return { Component: BookmarkRoute };
          },
        },
        {
          path: 'settings',
          lazy: async () => {
            const { SettingsRoute } = await import('./app/settings');
            return { Component: SettingsRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
