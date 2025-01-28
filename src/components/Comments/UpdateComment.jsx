import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateExistingComment } from "../../redux/slices/commentSlice";

const UpdateComment = ({
  commentId,
  currentContent,
  onUpdateSuccess,
  onClose,
}) => {
  const [content, setContent] = useState(currentContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment content cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await dispatch(updateExistingComment({ commentId, content })).unwrap();
      setLoading(false);
      onUpdateSuccess(); // Notify parent component of success
    } catch (err) {
      setLoading(false);
      setError("Failed to update comment. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-50">
      <form onSubmit={handleUpdate}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded mb-2 text-stone-950"
          rows={3}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UpdateComment;
