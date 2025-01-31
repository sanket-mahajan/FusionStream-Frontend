import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTweetById, fetchTweets } from "../../redux/slices/tweetSlice";

const GetAllTweets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tweets, isLoading, isError } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const onTweetClick = async (tweet) => {
    await dispatch(fetchTweetById(tweet._id));
    navigate(`/tweet/${tweet._id}`);
  };

  if (isLoading)
    return <p className="text-center text-gray-400">Loading tweets...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading tweets.</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">All Tweets</h2>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div
            key={tweet._id}
            onClick={() => onTweetClick(tweet)}
            className="p-4 bg-gray-700 rounded-lg shadow-sm"
          >
            <p className="text-gray-300 mb-2">{tweet.content}</p>
            <div className="text-sm text-gray-400">
              By:
              <button
                onClick={() => navigate(`/tweets/${tweet.owner?._id}`)}
                className="ml-1 text-blue-400 hover:underline"
              >
                {tweet.owner?.fullName}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllTweets;
