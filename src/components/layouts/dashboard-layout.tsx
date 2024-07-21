import { Header } from '../ui/header/header';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-full bg-zinc-100 pt-16">
      <Header />
      {children}
    </div>
  );
};
