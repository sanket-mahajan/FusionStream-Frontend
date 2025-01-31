import { useSelector } from "react-redux";
import Profile from "../components/user/Profile";
import LikedVideos from "../components/like/LikedVideos";
import { useNavigate } from "react-router-dom";
import WatchHistory from "../components/video/WatchHistory";
import UploadedByOwner from "../components/video/UploadedByOwner";

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Profile />

        <div className="grid grid-cols-1 gap-8">
          {/* Uploaded Videos Section */}
          <section className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Your Videos
              </h2>
            </div>
            <div className="p-6">
              <UploadedByOwner onVideoClick={handleVideoClick} />
            </div>
          </section>

          {/* Watch History Section */}
          <section className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch History
              </h2>
            </div>
            <div className="p-6">
              <WatchHistory onVideoClick={handleVideoClick} />
            </div>
          </section>

          {/* Liked Videos Section */}
          <section className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Liked Videos
              </h2>
            </div>
            <div className="p-6">
              <LikedVideos onVideoClick={handleVideoClick} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
