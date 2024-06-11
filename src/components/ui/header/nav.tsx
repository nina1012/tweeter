import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul className="relative flex h-full items-center justify-center gap-20 font-medium uppercase *:text-xs md:*:text-sm">
        <li>
          <Link to="/app/home">Home</Link>
        </li>
        <li>
          <Link to="/app/explore">Explore</Link>
        </li>
        <li>
          <Link to="/app/bookmark">Bookmark</Link>
        </li>
      </ul>
    </nav>
  );
};
