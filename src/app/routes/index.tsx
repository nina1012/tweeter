import { createBrowserRouter } from 'react-router-dom';

export const createRouter = () =>
  createBrowserRouter([
    // these pages are available to everyone
    {
      path: '/',
      lazy: async () => {
        const { HomeRoute } = await import('./home');
        return { Component: HomeRoute };
      },
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
