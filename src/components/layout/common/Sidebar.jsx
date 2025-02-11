import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHome, FiUpload, FiUsers, FiMessageSquare } from "react-icons/fi";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  return (
    <aside
      className={`bg-gray-800 text-white h-screen fixed top-16 left-0 hidden md:block border-r border-gray-700 transition-all duration-300  ${
        isSidebarOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="py-4 px-6 relative h-full">
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
