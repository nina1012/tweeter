import { Header } from '../ui/header/header';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative py-24">
      <Header />
      {children}
    </div>
  );
};
