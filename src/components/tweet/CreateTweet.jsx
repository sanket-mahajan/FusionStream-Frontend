import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTweet, fetchTweets } from "../../redux/slices/tweetSlice";

const CreateTweet = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      await dispatch(addTweet({ content }));
      setContent("");
      await dispatch(fetchTweets());
    } else {
      alert("Tweet content cannot be empty!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md mb-6"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 h-32 rounded-lg bg-gray-700 text-white resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
      >
        Tweet
      </button>
    </form>
  );
};

export default CreateTweet;
