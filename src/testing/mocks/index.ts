export const enableMocking = async () => {
  const isBrowser = () =>
    ![typeof window, typeof document].includes('undefined');
  if (isBrowser() && import.meta.env.DEV) {
    const { worker } = await import('./browser');
    return worker.start();
  }
  // commenting setting server because of the error while trying to build the app!!!
  // else {
  //   const { server } = await import('./server');
  //   server.listen();
  // }
};
