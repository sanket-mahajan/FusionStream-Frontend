import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import VideoList from "../components/video/VideoList";
import { updateUserWatchHistory } from "../redux/slices/userSlice";

const VideoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVideoClick = (videoId) => {
    // Navigate to the video details page
    dispatch(updateUserWatchHistory({ videoId: videoId }));
    navigate(`/videos/${videoId}`);
  };

  return (
    <div>
      <VideoList onVideoClick={handleVideoClick} />
    </div>
  );
};

export default VideoPage;
