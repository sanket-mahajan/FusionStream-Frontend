import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserTweets,
  deleteUserTweets,
} from "../../redux/slices/tweetSlice";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../layout/common/LoadingSpinner";

const GetUserTweets = () => {
  const dispatch = useDispatch();
  const { userTweets, isLoading, isError } = useSelector(
    (state) => state.tweets
  );
  const userId = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserTweets(userId));
    }
  }, [dispatch, userId]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  if (isError)
    return (
      <p className="text-center text-red-500">
        Error loading user&apos;s tweets.
      </p>
    );

  const handleDeleteTweet = (tweetId) => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      dispatch(deleteUserTweets(tweetId));
    }
    dispatch(fetchUserTweets(userId));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">User&apos;s Tweets</h2>
      {userTweets.length === 0 ? (
        <p className="text-center text-gray-400">
          No tweets found for this user.
        </p>
      ) : (
        <div className="space-y-4">
          {userTweets.map((tweet) => (
            <div
              key={tweet._id}
              className="p-4 bg-gray-700 rounded-lg shadow-sm"
            >
              <p className="text-gray-300 mb-2">{tweet.content}</p>
              <p className="text-sm text-gray-400">
                By:{" "}
                <span className="text-blue-400 font-semibold">
                  {tweet.owner?.fullName || "Unknown"}
                </span>
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleDeleteTweet(tweet._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetUserTweets;
