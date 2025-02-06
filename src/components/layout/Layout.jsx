import { useState } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Sidebar from "./common/Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar sideBarOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-grow min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content Wrapper */}
        <main className="flex-grow ">{children}</main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
