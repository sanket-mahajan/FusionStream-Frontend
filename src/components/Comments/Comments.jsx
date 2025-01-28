import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  fetchComments,
  addNewComment,
  deleteExistingComment,
} from "../../redux/slices/commentSlice";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import UpdateComment from "./UpdateComment";

const Comments = () => {
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const inputRef = useRef();

  const dispatch = useDispatch();
  const { comments, pagination, status } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.auth);

  const { videoId } = useParams();
  const { tweetId } = useParams();

  const eId = videoId || tweetId;

  useEffect(() => {
    dispatch(fetchComments({ entityId: eId, page: currentPage, limit }));
  }, [dispatch, eId, currentPage, limit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);
    await dispatch(addNewComment({ entityId: eId, content, parentId }));
    dispatch(fetchComments({ entityId: eId, page: currentPage, limit }));
    setContent("");
    setParentId(null);
  };

  const handleReply = (commentId) => {
    setParentId(commentId);
    inputRef.current.focus();
  };

  const handleDelete = async (commentId, parentId) => {
    await dispatch(deleteExistingComment({ commentId, parentId }));
    dispatch(fetchComments({ entityId: eId, page: currentPage, limit }));
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleEditSuccess = () => {
    setEditCommentId(null);
    dispatch(fetchComments({ entityId: eId, page: currentPage, limit }));
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-3xl mx-auto text-white">
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={content}
            ref={inputRef}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={
              parentId ? "Replying to a comment..." : "Add a comment..."
            }
          />
          <button
            type="submit"
            className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            {parentId ? "Reply" : "Comment"}
          </button>
        </div>
        {parentId && (
          <button
            type="button"
            onClick={() => setParentId(null)}
            className="mt-2 text-sm text-gray-400 hover:text-gray-200"
          >
            Cancel reply
          </button>
        )}
      </form>

      {/* Comments List */}
      {status === "loading" && (
        <p className="text-center text-gray-400">Loading comments...</p>
      )}

      {comments &&
        comments.map((comment) => (
          <div
            key={comment._id}
            className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md"
          >
            {editCommentId === comment._id ? (
              <UpdateComment
                commentId={comment._id}
                currentContent={comment.content}
                onUpdateSuccess={handleEditSuccess}
                onClose={() => setEditCommentId(null)}
              />
            ) : (
              <>
                <p className="mb-2">{comment.content}</p>
                <div className="flex items-center mb-4">
                  <img
                    src={comment.owner.avatar || "/default-avatar.png"} // Fallback to a default avatar
                    alt="User avatar"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{comment.owner.fullName}</p>
                    <p className="text-sm text-gray-400">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  {user._id === comment.owner._id && (
                    <>
                      <button
                        onClick={() => setEditCommentId(comment._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(comment._id, comment.parentId)
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleReply(comment._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies &&
                  comment.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="mt-4 pl-6 border-l-2 border-gray-600"
                    >
                      <p className="mb-2">{reply.content}</p>
                      <div className="flex items-center mb-4">
                        <img
                          src={reply.owner.avatar || "/default-avatar.png"} // Fallback to a default avatar
                          alt="User avatar"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold">
                            {reply.owner.fullName}
                          </p>
                          <p className="text-sm text-gray-400">
                            {formatDistanceToNow(new Date(reply.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                      {user._id === reply.owner._id && (
                        <div className="mt-2 flex items-center space-x-2">
                          <button
                            onClick={() => setEditCommentId(reply._id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(reply._id, reply.parentId)
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>
        ))}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: pagination.totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePagination(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
