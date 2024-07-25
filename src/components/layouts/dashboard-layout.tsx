import { Header } from '../ui/header/header';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-100 py-16">
      <Header />
      {children}
    </div>
  );
};
