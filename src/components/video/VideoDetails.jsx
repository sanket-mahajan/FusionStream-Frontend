import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideoById } from "../../redux/slices/videoSlice";
import { useParams } from "react-router-dom";
import { likeVideos, fetchLikedVideos } from "../../redux/slices/likeSlice";
import {
  fetchChannelSubscribers,
  fetchSubscribedChannels,
  toggleSubscribe,
} from "../../redux/slices/subscriptionSlice";
import AddToPlaylist from "../playlist/AddToPlaylist";
import Comments from "../Comments/Comments";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "../layout/common/LoadingSpinner";

const VideoDetails = () => {
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { currentVideo, isLoading, isError } = useSelector(
    (state) => state.video
  );
  const { user } = useSelector((state) => state.auth);
  const { subscribedChannels, channelSubscribers } = useSelector(
    (state) => state.subscription
  );
  const { likedVideos } = useSelector((state) => state.like);

  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoById(videoId));
    }
  }, [dispatch, videoId]);

  useEffect(() => {
    if (user) {
      dispatch(fetchSubscribedChannels(user._id));
      dispatch(fetchLikedVideos(user._id));
    }
    if (currentVideo?.owner?._id) {
      dispatch(fetchChannelSubscribers(currentVideo.owner._id));
      dispatch(fetchLikedVideos(user._id));
    }
  }, [dispatch, user, currentVideo]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">
        Failed to load video details.
      </div>
    );
  }

  if (!currentVideo) return null;

  const isSubscribed = subscribedChannels?.some(
    (c) => c.channel?._id?.toString() === currentVideo.owner._id.toString()
  );

  const isLiked = likedVideos?.some(
    (v) => v.video?._id?.toString() === currentVideo._id.toString()
  );

  const handleLikeClick = async () => {
    await dispatch(likeVideos(currentVideo._id));
    await dispatch(fetchLikedVideos(user._id));
  };

  const handleSubscribe = async () => {
    await dispatch(toggleSubscribe(currentVideo.owner._id));
    await dispatch(fetchSubscribedChannels(user._id));
    dispatch(fetchChannelSubscribers(currentVideo.owner._id));
  };

  return (
    <div className="p-1 sm:p-4 bg-gray-900 rounded-lg shadow-md mx-auto my-1 w-full max-w-[100vw] overflow-x-hidden">
      {/* Video Player Section */}
      <div className="mb-2">
        <video
          controls
          className="w-full rounded-lg shadow-md mb-2 aspect-video object-cover"
          src={currentVideo.videoFile}
        ></video>
        <h1 className="text-base sm:text-xl text-white font-bold mb-1 break-words px-1">
          {currentVideo.title}
        </h1>
        <div className="flex flex-wrap justify-between text-gray-400 text-xs px-1">
          <span className="mr-2">
            {currentVideo.views.toLocaleString()} views
          </span>
          <span>
            {formatDistanceToNow(new Date(currentVideo.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      {/* Channel Info and Actions */}
      <div className="flex flex-col sm:flex-row items-center mb-2 gap-1 sm:gap-4 px-1">
        <img
          src={currentVideo.owner?.avatar}
          alt="Channel Avatar"
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-grow text-center sm:text-left">
          <span className="text-xs sm:text-base text-white font-semibold block">
            {currentVideo.owner?.fullName}
          </span>
          <span className="text-[10px] sm:text-sm text-gray-400">
            {channelSubscribers.length} subscribers
          </span>
        </div>
        <button
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm text-white w-full sm:w-auto ${
            isSubscribed
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleSubscribe}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>

      {/* Like and Playlist Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mb-2 px-1">
        <button
          onClick={handleLikeClick}
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-base text-white shadow-md w-full ${
            isLiked
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={() => setShowAddToPlaylist(!showAddToPlaylist)}
          className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-base text-white shadow-md bg-blue-500 hover:bg-blue-600 w-full"
        >
          Add to Playlist
        </button>
      </div>

      {showAddToPlaylist && <AddToPlaylist />}

      {/* Video Description */}
      <div className="text-gray-300 mb-2 px-1">
        <h2 className="text-sm sm:text-lg font-bold text-white mb-1">
          Description
        </h2>
        <p className="text-[11px] sm:text-sm break-words">
          {currentVideo.description}
        </p>
      </div>

      {/* Comments Section */}
      <div className="mt-2 px-1">
        <h2 className="text-sm sm:text-xl text-white font-bold mb-2">
          Comments
        </h2>
        <Comments />
      </div>
    </div>
  );
};

export default VideoDetails;
