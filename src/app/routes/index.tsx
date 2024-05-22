/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from 'react-router-dom';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <div>app layout</div>,

      children: [
        // main pages
        {
          path: 'home',
          element: <p>home page</p>,
        },
        {
          path: 'explore',
          element: <p>explore page</p>,
        },
        {
          path: 'bookmarks',
          element: <p>bookmarks page</p>,
        },
        // user pages
        {
          path: 'profile',
          element: <p>profile page</p>,
        },
        {
          path: 'settings',
          element: <p>settings page</p>,
        },
      ],
    },
  ]);
