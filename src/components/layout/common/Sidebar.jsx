import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHome, FiUpload, FiUsers, FiMessageSquare } from "react-icons/fi";
import clsx from "clsx";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);

  return (
    <aside
      className={clsx(
        "bg-gray-800 text-white h-screen fixed top-16 left-0 border-r border-gray-700 transition-all duration-300 overflow-hidden",
        "hidden md:block",
        {
          "w-64": isSidebarOpen, // wide when open
          "w-20": !isSidebarOpen, // narrow when collapsed
        }
      )}
    >
      <div
        className={clsx("py-4 relative h-full", {
          "px-6": isSidebarOpen, // extra horizontal padding when open
          "px-2": !isSidebarOpen, // less padding when collapsed so icons stay visible
        })}
      >
        <nav className="space-y-2">
          <div className="mb-6">
            {isSidebarOpen && (
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">
                Main Navigation
              </h3>
            )}
            <div className="space-y-2">
              <Link
                to="/profile"
                className={clsx(
                  "flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors",
                  { "justify-center": !isSidebarOpen }
                )}
              >
                <FiHome className="text-gray-400 text-xl" />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
              <Link
                to="/videos/addVideo"
                className={clsx(
                  "flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors",
                  { "justify-center": !isSidebarOpen }
                )}
              >
                <FiUpload className="text-gray-400 text-xl" />
                {isSidebarOpen && <span>Upload Video</span>}
              </Link>
              <Link
                to="/subscriptions"
                className={clsx(
                  "flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors",
                  { "justify-center": !isSidebarOpen }
                )}
              >
                <FiUsers className="text-gray-400 text-xl" />
                {isSidebarOpen && <span>Subscriptions</span>}
              </Link>
              <Link
                to="/tweets"
                className={clsx(
                  "flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md transition-colors",
                  { "justify-center": !isSidebarOpen }
                )}
              >
                <FiMessageSquare className="text-gray-400 text-xl" />
                {isSidebarOpen && <span>Tweets</span>}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
