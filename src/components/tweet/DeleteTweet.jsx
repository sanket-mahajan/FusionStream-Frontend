import { useDispatch } from "react-redux";
import { deleteUserTweets } from "../../slices/tweetSlice";

const DeleteTweet = ({ tweetId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      dispatch(deleteUserTweets(tweetId));
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteTweet;
