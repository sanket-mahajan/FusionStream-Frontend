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
    return <p>Please log in to view your profile.</p>;
  }

  const handleVideoClick = (videoId) => {
    // Navigate to the video details page
    navigate(`/videos/${videoId}`);
  };

  return (
    <div className="p-6 bg-slate-900">
      <Profile />
      <div className="p-6">
        <UploadedByOwner onVideoClick={handleVideoClick} />
      </div>
      <div className="p-6">
        <WatchHistory onVideoClick={handleVideoClick} />
      </div>
      <div className="p-6">
        <LikedVideos onVideoClick={handleVideoClick} />
      </div>
    </div>
  );
};

export default UserProfilePage;
