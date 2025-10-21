import Topnav from '@/components/Topnav';
import Sidenav from "@/components/Sidenav";
import Footer from '@/components/Footer';

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-row ">
      <Sidenav />
      <div className="min-h-screen flex flex-col w-svw">
        <Topnav/>
        <div className="grow py-2 px-4 sm:px-4 lg:px-6">{children}</div>
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;
