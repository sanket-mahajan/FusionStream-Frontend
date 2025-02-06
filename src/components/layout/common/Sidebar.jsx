import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiUpload,
  FiUsers,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Logo from "../../../assets/FusionStream.svg";

const Sidebar = ({ sideBarOpen }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    sideBarOpen(!isSidebarOpen);
  };

  return (
    <aside
      className={`bg-gray-800 text-white h-screen fixed top-0 left-0 hidden md:block border-r border-gray-700 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="py-4 px-6 relative h-full">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 bg-gray-800 rounded-full p-1.5 border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          {isSidebarOpen ? (
            <FiChevronLeft className="text-white text-lg" />
          ) : (
            <FiChevronRight className="text-white text-lg" />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 text-2xl font-bold mb-8 hover:text-blue-400 transition-colors ${
            !isSidebarOpen && "justify-center"
          }`}
        >
          {/* <FiFilm className="text-blue-400" /> */}
          <img src={Logo} alt="Fusion Stream Logo" className="h-9 w-9" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Fusion Stream</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          <div className="mb-6">
            <h3
              className={`text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider ${
                !isSidebarOpen && "hidden"
              }`}
            >
              Main Navigation
            </h3>
            <div className="space-y-2">
              <Link
                to="/profile"
                className={`flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <FiHome className="text-gray-400" />
                <span className={`${!isSidebarOpen && "hidden"}`}>
                  Dashboard
                </span>
              </Link>
              <Link
                to="/videos/addVideo"
                className={`flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <FiUpload className="text-gray-400" />
                <span className={`${!isSidebarOpen && "hidden"}`}>
                  Upload Video
                </span>
              </Link>
              <Link
                to="/subscriptions"
                className={`flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <FiUsers className="text-gray-400" />
                <span className={`${!isSidebarOpen && "hidden"}`}>
                  Subscriptions
                </span>
              </Link>
              <Link
                to="/tweets"
                className={`flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors ${
                  !isSidebarOpen ? "justify-center" : ""
                }`}
              >
                <FiMessageSquare className="text-gray-400" />
                <span className={`${!isSidebarOpen && "hidden"}`}>Tweets</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
