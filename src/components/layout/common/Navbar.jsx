import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../auth/Logout";
import { fetchAllVideos } from "../../../redux/slices/videoSlice";
import { fetchCurrentUser } from "../../../redux/slices/authSlice";
import {
  toggleSidebar,
  closeSidebar,
} from "../../../redux/slices/sidebarSlice";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Logo from "../../../assets/FusionStream.svg";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const logout = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, accessToken, user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 780) {
        dispatch(closeSidebar());
      }
    };

    window.addEventListener("resize", handleResize);
    // Check on mount
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(fetchAllVideos({ query: search }));
      navigate("/videos");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <header className="bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16 gap-4 relative">
          {/* Mobile Menu Button (Visible only on Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center flex-1 sm:flex-none sm:ml-14">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold hover:text-blue-400 transition-colors"
            >
              <img src={Logo} alt="Fusion Stream Logo" className="h-9 w-9" />
              <span className="hidden sm:inline ml-2">Fusion Stream</span>
            </Link>
          </div>

          {/* Desktop Sidebar Toggle (Visible only on Desktop) */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="hidden sm:flex absolute top-5 bg-gray-800 rounded-full p-1.5 border border-gray-700 hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <FiChevronLeft className="text-white text-lg" />
            ) : (
              <FiChevronRight className="text-white text-lg" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex space-x-4 mx-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/videos">Videos</NavLink>
            <NavLink to="/playlists">Playlists</NavLink>
            <NavLink to="/tweets">Tweets</NavLink>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="relative flex-1 max-w-[500px]"
            >
              <input
                type="text"
                value={search}
                placeholder="Search videos..."
                className="w-full rounded-md pl-4 pr-10 py-2 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                aria-label="Search videos"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                aria-label="Submit search"
              >
                <SearchIcon />
              </button>
            </form>

            {/* Add Video Button (Desktop only) */}
            <Link
              to="/videos/addVideo"
              className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-full transition-colors hidden sm:flex"
              aria-label="Add new video"
            >
              <PlusIcon />
            </Link>

            {/* Profile Section */}
            <ProfileSection
              user={user}
              accessToken={accessToken}
              logout={logout}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4 pt-2">
            <nav className="flex flex-col space-y-2">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/videos" onClick={() => setIsMenuOpen(false)}>
                Videos
              </MobileNavLink>
              <MobileNavLink
                to="/playlists"
                onClick={() => setIsMenuOpen(false)}
              >
                Playlists
              </MobileNavLink>
              <MobileNavLink to="/tweets" onClick={() => setIsMenuOpen(false)}>
                Tweets
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Reusable components
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors whitespace-nowrap"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-3 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition-colors"
  >
    {children}
  </Link>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 sm:h-6 sm:w-6"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
      clipRule="evenodd"
    />
  </svg>
);

const ProfileSection = ({ user, accessToken, logout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center focus:outline-none"
        aria-label="User menu"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User avatar"}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm font-medium">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-900 z-50">
          {accessToken ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
