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

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading tweet...</p>;
  }

  if (isError || !tweet) {
    return <p className="text-center text-red-500">Error loading tweet.</p>;
  }

  console.log("tweet Id", tweet._id);
  console.log("Liked Tweets", likedTweets);

  const isLiked = likedTweets?.some(
    (t) => t?.tweet?._id?.toString() === tweet._id.toString()
  );

  const handleTweetUpdate = async () => {
    if (content.trim()) {
      dispatch(updateUserTweets({ tweetId: tweet._id, content }));
      await dispatch(fetchTweetById(tweetId));
      setIsModalOpen(false); // Close modal after updating
    } else {
      alert("Content cannot be empty!");
    }
  };

  const handleLikeClick = async () => {
    await dispatch(likeTweet(tweet._id));
    await dispatch(fetchLikedTweets(user?._id)); // Refresh liked tweets
  };

  const handleSubscribe = async () => {
    await dispatch(toggleSubscribe(tweet.owner._id));
    await dispatch(fetchSubscribedChannels(user._id)); // Refresh subscriptions
  };

  const openUpdateModal = () => {
    setContent(tweet.content); // Set the current tweet content in the input field
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    await dispatch(fetchTweetById(tweetId));
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-xl max-w-3xl mx-auto text-white relative my-2">
      {/* Tweet Content */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">{tweet.content}</h1>
        <p className="text-sm text-gray-400">
          Posted by{" "}
          <span className="font-semibold text-white">
            {tweet.owner?.fullName}
          </span>
        </p>
      </div>

      {/* Tweet Actions */}
      {tweet.owner?._id === user._id && (
        <div className="flex justify-between items-center">
          <button
            onClick={openUpdateModal}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
          >
            Update
          </button>
        </div>
      )}

      <div className="flex justify-between text-gray-400 text-sm mt-4">
        <span>
          {formatDistanceToNow(new Date(tweet.createdAt), {
            addSuffix: true,
          })}
        </span>
        {tweet.createdAt !== tweet.updatedAt && (
          <span className="italic">Edited</span>
        )}
      </div>

      {/* Actions: Like and Subscribe */}
      <div className="flex items-center justify-between mt-6 mb-8">
        <button
          onClick={handleLikeClick}
          className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 ease-in-out ${
            isLiked
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={handleSubscribe}
          className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 ease-in-out ${
            isSubscribed
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <Comments />
      </div>

      {/* Modal for Updating Tweet */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Update Tweet
            </h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-gray-500 text-white rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleTweetUpdate}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 ease-in-out hover:bg-blue-600"
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
