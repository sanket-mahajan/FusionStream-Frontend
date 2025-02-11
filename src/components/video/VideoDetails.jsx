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

  if (isLoading) {
    return (
      <div className="text-white text-center py-6">
        Loading video details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-6">
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

  // const isLiked = true;

  const handleLikeClick = async () => {
    await dispatch(likeVideos(currentVideo._id));
    await dispatch(fetchLikedVideos(user._id));
  };

  const handleSubscribe = async () => {
    await dispatch(toggleSubscribe(currentVideo.owner._id));
    await dispatch(fetchSubscribedChannels(user._id)); // Refresh subscriptions
    dispatch(fetchChannelSubscribers(currentVideo.owner._id)); // Refresh subscribers
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 rounded-lg shadow-md mx-auto relative my-2">
      {/* Video Player Section */}
      <div className="mb-4 md:mb-6">
        <div className="aspect-video rounded-lg overflow-hidden">
          <video
            controls
            className="w-full h-full object-cover"
            src={currentVideo.videoFile}
          ></video>
        </div>
        <h1 className="text-xl md:text-3xl text-white font-bold mt-4 mb-2">
          {currentVideo.title}
        </h1>
        <div className="flex justify-between text-gray-400 text-xs md:text-sm">
          <span>{currentVideo.views.toLocaleString()} views</span>
          <span>
            {formatDistanceToNow(new Date(currentVideo.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      {/* Channel Info and Actions */}
      <div className="flex flex-wrap items-center mb-4 md:mb-6 gap-3">
        <img
          src={currentVideo.owner?.avatar}
          alt="Channel Avatar"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-grow min-w-[200px] flex-1">
          <span className="text-base md:text-lg text-white font-semibold block">
            {currentVideo.owner?.fullName}
          </span>
          <span className="text-xs md:text-sm text-gray-400">
            {channelSubscribers.length} subscribers
          </span>
        </div>
        <button
          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base text-white ${
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
      <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
        <button
          onClick={handleLikeClick}
          className={`px-4 py-2 rounded-lg text-sm md:text-base text-white shadow-md ${
            isLiked
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={() => setShowAddToPlaylist(!showAddToPlaylist)}
          className="px-4 py-2 rounded-lg text-sm md:text-base text-white shadow-md bg-blue-500 hover:bg-blue-600"
        >
          Add to Playlist
        </button>
      </div>

      {/* Video Description */}
      <div className="text-gray-300 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-2">
          Description
        </h2>
        <p className="text-sm md:text-base break-words">
          {currentVideo.description}
        </p>
      </div>

      {/* Comments Section */}
      <div className="mt-4 md:mt-6">
        <h2 className="text-xl md:text-2xl text-white font-bold mb-3">
          Comments
        </h2>
        <Comments />
      </div>
    </div>
  );
};

export default VideoDetails;
