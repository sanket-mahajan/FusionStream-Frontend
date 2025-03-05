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
import LoadingSpinner from "../layout/common/LoadingSpinner";

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

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (isError || !tweet) {
    return <p className="text-center text-red-500">Error loading tweet.</p>;
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 bg-gray-900 rounded-xl border border-gray-800 w-full max-w-full mx-auto text-white my-2 sm:my-4 overflow-x-hidden">
      {/* Tweet Content with Wrapper */}
      <div className="prose prose-invert mx-auto mb-4">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold break-words text-gray-100">
          {tweet.content}
        </h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
          <span className="text-gray-400">Posted by</span>
          <span className="font-medium text-blue-400">
            {tweet.owner?.fullName}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-500">
            {formatDistanceToNow(new Date(tweet.createdAt), {
              addSuffix: true,
            })}
          </span>
          {tweet.createdAt !== tweet.updatedAt && (
            <span className="italic text-gray-500">(edited)</span>
          )}
        </div>
      </div>

      {/* Owner Actions */}
      {tweet.owner?._id === user._id && (
        <div className="mb-4 max-w-full">
          <button
            onClick={openUpdateModal}
            className="w-full py-2 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Edit Tweet
          </button>
        </div>
      )}

      {/* Engagement Bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6 max-w-full">
        <button
          onClick={handleLikeClick}
          className={`flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-lg font-medium transition-colors duration-200 ${
            isLiked
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLiked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <button
          onClick={handleSubscribe}
          className={`flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-lg font-medium transition-colors duration-200 ${
            isSubscribed
              ? "bg-purple-500 hover:bg-purple-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubscribed ? "✔️ Subscribed" : "➕ Subscribe"}
        </button>
      </div>

      {/* Comments Section */}
      <div className="space-y-4 max-w-full">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-200">
          Comments
        </h2>
        <Comments />
      </div>

      {/* Update Tweet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-[95vw] space-y-4">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100">
              Edit Tweet
            </h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              rows="4"
              placeholder="What's happening?"
            />
            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={closeModal}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTweetUpdate}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetDetails;
