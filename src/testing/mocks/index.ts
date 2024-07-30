export const enableMocking = async () => {
  const isBrowser = () =>
    ![typeof window, typeof document].includes('undefined');
  if (isBrowser()) {
    const { worker } = await import('./browser');
    return worker.start();
  } else {
    const { server } = await import('./server');
    server.listen();
  }
};
