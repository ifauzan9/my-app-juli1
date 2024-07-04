import Navbar from "../Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AppShell;
