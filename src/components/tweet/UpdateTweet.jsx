import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserTweets } from "../../redux/slices/tweetSlice";

const UpdateTweet = ({ tweet }) => {
  const [content, setContent] = useState(tweet.content);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (content.trim()) {
      dispatch(updateUserTweets({ tweetId: tweet._id, content }));
    } else {
      alert("Content cannot be empty!");
    }
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateTweet;
