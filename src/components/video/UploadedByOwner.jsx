import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import {
  fetchUploadedVideos,
  removeVideo,
} from "../../redux/slices/videoSlice";
import EditVideo from "./EditVideo";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const UploadedByOwner = ({ onVideoClick }) => {
  const dispatch = useDispatch();
  const { uploadedVideos, isError, isLoading } = useSelector(
    (state) => state.video
  );
  const [editingVideo, setEditingVideo] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchUploadedVideos());
  }, [dispatch]);

  const handleDeleteConfirmed = async () => {
    try {
      await dispatch(removeVideo(deleteConfirmation._id));
      dispatch(fetchUploadedVideos());
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 3000);
    } catch (error) {
      console.error("Delete failed:", error);
    }
    setDeleteConfirmation(null);
  };

  const handleEditClick = (video) => {
    setEditingVideo(video); // Set the video to be edited
  };

  if (isLoading) return <div className="text-white p-4">Loading videos...</div>;
  if (isError) return <ErrorHandler />;

  return (
    <div className="p-6">
      {/* Toast Notification */}
      {isToastVisible && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg animate-slideIn">
          Video deleted successfully!
        </div>
      )}

      <h1 className="text-3xl text-white font-bold mb-8">
        Your Uploaded Videos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {uploadedVideos?.length > 0 ? (
          uploadedVideos.map((video) => (
            <div
              key={video._id}
              className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div
                onClick={() => onVideoClick(video._id)}
                className="cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(video);
                  }}
                  className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => {
                    setDeleteConfirmation(video);
                  }}
                  className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center col-span-full py-12">
            No videos uploaded yet.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-300">
              Are you sure you want to delete "{deleteConfirmation.title}"?
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Video Modal */}
      {editingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <EditVideo
              video={editingVideo}
              onClose={() => setEditingVideo(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedByOwner;
