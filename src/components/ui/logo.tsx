import { Link } from 'react-router-dom';

import useMediaQuery from '@/hooks/useMediaQuery';

export const Logo = () => {
  const { screenSize } = useMediaQuery();
  return (
    <Link to="/app/home">
      <img
        src={
          screenSize[0] < 1024
            ? '/images/tweeter-small.svg'
            : '/images/tweeter.svg'
        }
        alt="Tweeter logo"
      />
    </Link>
  );
};
