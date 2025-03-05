import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelSubscribers,
  fetchSubscribedChannels,
  toggleSubscribe,
} from "../../redux/slices/subscriptionSlice";
import { fetchLikedTweets, likeTweet } from "../../redux/slices/likeSlice";
import Comments from "../Comments/Comments";
import { useParams } from "react-router-dom";
import {
  fetchTweetById,
  updateUserTweets,
} from "../../redux/slices/tweetSlice";
import { formatDistanceToNow } from "date-fns";

const TweetDetails = () => {
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { subscribedChannels } = useSelector((state) => state.subscription);
  const { likedTweets } = useSelector((state) => state.like);
  const { tweet, isLoading, isError } = useSelector((state) => state.tweets);

  const { tweetId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tweetId) {
      dispatch(fetchTweetById(tweetId));
    }
  }, [dispatch, tweetId, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchSubscribedChannels(user._id));
      dispatch(fetchLikedTweets(user?._id));
    }
    if (tweet?.owner?._id) {
      dispatch(fetchChannelSubscribers(tweet.owner._id));
      dispatch(fetchLikedTweets(user?._id));
    }
  }, [dispatch, user, tweet]);

  const isSubscribed = subscribedChannels?.some(
    (c) => c.channel._id.toString() === tweet?.owner?._id.toString()
  );

  const isLiked = likedTweets?.some(
    (t) => t?.tweet?._id?.toString() === tweet._id.toString()
  );

  const handleTweetUpdate = async () => {
    if (content.trim()) {
      dispatch(updateUserTweets({ tweetId: tweet._id, content }));
      await dispatch(fetchTweetById(tweetId));
      setIsModalOpen(false);
    } else {
      alert("Content cannot be empty!");
    }
  };

  const handleLikeClick = async () => {
    await dispatch(likeTweet(tweet._id));
    await dispatch(fetchLikedTweets(user?._id));
  };

  const handleSubscribe = async () => {
    await dispatch(toggleSubscribe(tweet.owner._id));
    await dispatch(fetchSubscribedChannels(user._id));
  };

  const openUpdateModal = () => {
    setContent(tweet.content);
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    await dispatch(fetchTweetById(tweetId));
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading tweet...</p>;
  }

  if (isError || !tweet) {
    return <p className="text-center text-red-500">Error loading tweet.</p>;
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700 w-full max-w-full sm:max-w-2xl md:max-w-3xl mx-auto text-white relative my-2 overflow-x-hidden">
      {/* Tweet Content */}
      <div className="mb-2 sm:mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 break-words px-1">
          {tweet.content}
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-400 break-words px-1">
          Posted by{" "}
          <span className="font-semibold text-white">
            {tweet.owner?.fullName}
          </span>
        </p>
      </div>

      {/* Tweet Actions */}
      {tweet.owner?._id === user._id && (
        <div className="flex justify-between items-center mt-2 sm:mt-4">
          <button
            onClick={openUpdateModal}
            className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 text-xs sm:text-sm"
          >
            Update
          </button>
        </div>
      )}

      {/* Timestamp and Edited Indicator */}
      <div className="flex flex-col sm:flex-row justify-between text-gray-400 text-[10px] sm:text-xs mt-2 sm:mt-4 px-1">
        <span>
          {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
        </span>
        {tweet.createdAt !== tweet.updatedAt && (
          <span className="italic mt-1 sm:mt-0">Edited</span>
        )}
      </div>

      {/* Actions: Like and Subscribe */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-2 sm:mt-4 mb-4 sm:mb-6 gap-2 sm:gap-0 px-1">
        <button
          onClick={handleLikeClick}
          className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 ease-in-out text-xs sm:text-sm ${
            isLiked
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={handleSubscribe}
          className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 ease-in-out text-xs sm:text-sm ${
            isSubscribed
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-2 sm:mt-4 px-1">
        <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-3">
          Comments
        </h2>
        <Comments />
      </div>

      {/* Modal for Updating Tweet */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-2 sm:p-0">
          <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg w-full max-w-[90vw] sm:w-80 transform transition-all duration-300 ease-in-out">
            <h3 className="text-base sm:text-xl font-semibold text-white mb-2 sm:mb-3">
              Update Tweet
            </h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-700 text-white rounded-lg mb-2 sm:mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              rows="3"
            />
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={closeModal}
                className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-600 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleTweetUpdate}
                className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 ease-in-out hover:bg-blue-600 text-xs sm:text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetDetails;
