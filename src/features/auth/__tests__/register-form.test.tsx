import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import { appRender, userEvent, screen, waitFor } from '@/testing/test-utils';

import { RegisterForm } from '../components/register-form';

test('should register a new user and display notification with right text', async () => {
  const onSuccess = vi.fn();
  const newUser = {
    firstName: 'user',
    lastName: 'demo',
    username: 'username',
    email: 'demo@user.com',
    password: 'password',
  };
  appRender(
    <MemoryRouter>
      <RegisterForm onSuccess={onSuccess} />
    </MemoryRouter>,
  );

  await userEvent.type(screen.getByTestId('first name'), newUser.firstName);
  await userEvent.type(screen.getByTestId('last name'), newUser.lastName);
  await userEvent.type(screen.getByTestId('username'), newUser.username);
  await userEvent.type(screen.getByTestId('email'), newUser.email);
  await userEvent.type(screen.getByTestId('password'), newUser.password);
  await userEvent.type(
    screen.getByPlaceholderText('Confirm password'),
    newUser.password,
  );

  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(
      screen.getByRole('alert', { name: 'Welcome to Tweeter! 😊' }),
    ).toHaveBeenCalled(),
  );
});
