import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Sidebar from "./common/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex flex-col flex-grow ml-64">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-grow p-6">{children}</main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
