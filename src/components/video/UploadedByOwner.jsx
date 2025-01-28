import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import {
  fetchUploadedVideos,
  removeVideo,
} from "../../redux/slices/videoSlice"; // Adjust the import path as necessary
import EditVideo from "./EditVideo";

const UploadedByOwner = ({ onVideoClick }) => {
  const dispatch = useDispatch();
  const { uploadedVideos, isError, isLoading } = useSelector(
    (state) => state.video
  );

  const [editingVideo, setEditingVideo] = useState(null); // State to track which video is being edited

  useEffect(() => {
    dispatch(fetchUploadedVideos());
  }, [dispatch]);

  const handleEditClick = (video) => {
    setEditingVideo(video); // Set the video to be edited
  };

  const handleEditClose = () => {
    setEditingVideo(null); // Clear the editing state when editing is done
  };

  const handleDelete = (video) => {
    dispatch(removeVideo(video._id));
    alert("Video Deleted");
    dispatch(fetchUploadedVideos());
  };

  if (isLoading) return <div className="text-white">Loading videos...</div>;
  if (isError)
    return (
      <div className="text-red-500">
        <ErrorHandler />
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl text-white font-bold mb-4">Uploaded Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 relative">
        {Array.isArray(uploadedVideos) && uploadedVideos.length > 0 ? (
          uploadedVideos.map((video) => (
            <div key={video._id}>
              <div
                onClick={() => onVideoClick(video._id)}
                className="p-4 bg-gray-800 rounded-md shadow-md hover:cursor-pointer hover:bg-gray-700 relative"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg text-white font-bold mt-2">
                  {video.title}
                </h2>
                <p className="text-gray-400 text-sm">{video.description}</p>
              </div>
              <button
                className="bg-blue-500 text-white rounded-md p-2 mt-2"
                onClick={() => handleEditClick(video)} // Correctly pass the video object
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white rounded-md p-2 mt-2"
                onClick={() => handleDelete(video)} // Correctly pass the video object
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="text-white">No videos available.</div>
        )}
      </div>

      {/* Conditional rendering for the EditVideo component */}
      {editingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-md">
            <EditVideo video={editingVideo} onClose={handleEditClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedByOwner;
