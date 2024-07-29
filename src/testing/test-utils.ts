import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ReactElement } from 'react';
import { expect } from 'vitest';

import { AppProvider } from '../app/main-provider';

// this renders the app inside the AppProvider
export const appRender = (ui: ReactElement) => {
  return render(ui, { wrapper: AppProvider });
};

// waits for all loading spinners to disappear
export const waitForLoadingToFinish = () => {
  return waitFor(
    () => {
      const loaders = [
        ...screen.queryAllByTestId(/loading/i),
        ...screen.queryAllByText(/loading/i),
      ];

      loaders.forEach((loader) => expect(loader).not.toBeInTheDocument());
    },
    {
      timeout: 4000,
    },
  );
};

export * from '@testing-library/react';
export { userEvent };
