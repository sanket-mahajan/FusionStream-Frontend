import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 ">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-4 text-blue-400 animate-fade-in">
          Welcome to Fusion Stream
        </h1>
        <p className="text-lg text-gray-300 mb-6 animate-fade-in delay-200">
          A seamless platform merging the best of videos and microblogging.
          Upload, watch, engage, and share your moments all in one place.
        </p>
        <div className="flex flex-col md:flex-row gap-4 animate-fade-in delay-400 justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition">
            <Link to="/videos">Explore Videos</Link>
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg transition">
            <Link to="/tweets">Explore Tweets</Link>
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl">
        <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-blue-400">
            Watch & Upload
          </h3>
          <p className="text-gray-400 mt-2">
            Share your videos or discover trending content from creators
            worldwide.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-blue-400">
            Engage & Interact
          </h3>
          <p className="text-gray-400 mt-2">
            Comment, like, and subscribe to stay connected with your favorite
            creators.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-blue-400">Stay Updated</h3>
          <p className="text-gray-400 mt-2">
            Follow trending conversations and be part of the social wave.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
// const Homepage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const accessToken = localStorage.getItem("accessToken");
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Welcome to Fusion Stream</h1>
//       <p>Explore trending videos, your subscriptions, and more!</p>
//       {!user && !accessToken && (
//         <div>
//           <p>Sign in to start watching videos.</p>
//           <LoginPage />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Homepage;
