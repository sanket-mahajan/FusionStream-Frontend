import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Sidebar from "./common/Sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-grow min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Main Content Wrapper */}
        <main className="flex-grow mt-16">{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
