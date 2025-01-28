import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 hidden md:block">
      <div className="py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6">Fusion Stream</h1>

        {/* Links */}
        <nav className="space-y-4">
          <Link
            to="/profile"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            to="videos/addVideo"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md"
          >
            Upload Video
          </Link>
          <Link
            to="/subscriptions"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md"
          >
            Subscriptions
          </Link>
          <Link
            to="/tweets"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md"
          >
            Tweets
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
