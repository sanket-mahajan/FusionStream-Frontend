import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useLogout from "../../auth/Logout";
import { fetchAllVideos } from "../../../redux/slices/videoSlice";
import { fetchCurrentUser } from "../../../redux/slices/authSlice";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);
  const logout = useLogout();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchAllVideos({ query: search }));
  };

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, accessToken]);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Fusion Stream</Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/videos" className="hover:text-gray-300">
            Videos
          </Link>
          <Link to="/playlists" className="hover:text-gray-300">
            Playlists
          </Link>
          <Link to="/tweets" className="hover:text-gray-300">
            Tweets
          </Link>
        </nav>

        {/* Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              placeholder="Search Videos"
              className="rounded-md px-3 py-2 text-black pr-10"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              type="search"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <Link to="videos/addVideo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link to="/profile">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ? user.name : "Profile"}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Link>
          {user && accessToken && (
            <button type="submit" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
