import { useLayoutEffect, useState } from 'react';

const useMediaQuery = () => {
  const [screenSize, setScreenSize] = useState(() => [
    window.innerWidth,
    window.innerHeight,
  ]);

  useLayoutEffect(() => {
    const updatingSizes = () => {
      setScreenSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updatingSizes);

    return () => window.removeEventListener('resize', updatingSizes);
  }, []);
  return { screenSize };
};

export default useMediaQuery;
