import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Sidebar from "./common/Sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is fixed at the top */}
      <Navbar />

      {/* Main container for Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar is responsible for its own responsiveness */}
        <Sidebar />

        {/* Main Content Area */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          {/* Ensure content is not hidden behind the fixed Navbar */}
          <main className="flex-1 mt-16">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
