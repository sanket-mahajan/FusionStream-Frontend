import { useNavigate } from "react-router-dom";
import VideoUploader from "../components/video/VideoUploader";

const VideoForm = () => {
  const navigate = useNavigate();

  const onUpload = (videoId) => {
    navigate(`/videos/${videoId}`);
  };
  return (
    <div>
      <VideoUploader onUpload={onUpload} />
    </div>
  );
};

export default VideoForm;
