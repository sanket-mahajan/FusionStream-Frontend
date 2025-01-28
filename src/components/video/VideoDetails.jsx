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

  console.log(likedVideos);
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
    <div className="p-6 bg-gray-900 rounded-lg shadow-md max-w-4xl mx-auto relative">
      {/* Video Player Section */}
      <div className="mb-6">
        <video
          controls
          className="w-full rounded-lg shadow-lg mb-4"
          src={currentVideo.videoFile}
        ></video>
        <h1 className="text-3xl text-white font-extrabold mb-2">
          {currentVideo.title}
        </h1>
        <div className="flex justify-between text-gray-400 text-sm">
          <span>{currentVideo.views.toLocaleString()} views</span>
          <span>
            {formatDistanceToNow(new Date(currentVideo.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      {/* Channel Info and Actions */}
      <div className="flex items-center mb-6">
        <img
          src={currentVideo.owner?.avatar}
          alt="Channel Avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 mr-4"
        />
        <div className="flex-grow">
          <span className="text-lg text-white font-semibold block">
            {currentVideo.owner?.fullName}
          </span>
          <span className="text-sm text-gray-400">
            {channelSubscribers.length} subscribers
          </span>
        </div>
        <button
          className={`px-4 py-2 rounded-lg text-white ${
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
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={handleLikeClick}
          className={`px-6 py-2 rounded-lg text-lg text-white shadow-md ${
            isLiked
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={() => setShowAddToPlaylist(!showAddToPlaylist)}
          className="px-6 py-2 rounded-lg text-lg text-white shadow-md bg-blue-500 hover:bg-blue-600"
        >
          Add to Playlist
        </button>
      </div>
      {showAddToPlaylist && <AddToPlaylist />}

      {/* Video Description */}
      <div className="text-gray-300 mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Description</h2>
        <p>{currentVideo.description}</p>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-2xl text-white font-bold mb-4">Comments</h2>
        <Comments />
      </div>
    </div>
  );
};

export default VideoDetails;
