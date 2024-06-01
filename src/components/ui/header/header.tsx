import { Logo } from '../logo';

import { Nav } from './nav';
import { UserDropdown } from './user-dropdown';

export const Header = () => {
  return (
    <header className="fixed top-0 z-[999] flex h-16 w-full items-center justify-between bg-white px-5 shadow-md md:px-32">
      <Logo />
      <Nav />
      <UserDropdown />
    </header>
  );
};
