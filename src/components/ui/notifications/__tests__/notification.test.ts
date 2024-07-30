import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';

import { useNotifications, Notification } from '../notifications-store';

test('should add and remove notifications', () => {
  // using renderHook because we are getting notifications[] from calling useNotification hook
  const { result } = renderHook(() => useNotifications());

  expect(result.current.notifications.length).toBe(0);

  const notification: Notification = {
    id: '1',
    message: 'This is a test notification',
    title: 'Hello world!',
    type: 'info',
  };

  // adding notification
  act(() => {
    result.current.addNotification(notification);
  });

  expect(result.current.notifications.length).toBe(1);
  expect(result.current.notifications).toContainEqual(notification);

  // removing notification
  act(() => {
    result.current.dismissNotification(notification.id);
  });
  expect(result.current.notifications.length).toBe(0);
  expect(result.current.notifications).not.toContainEqual(notification);
});
