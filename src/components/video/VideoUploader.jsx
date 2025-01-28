import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadNewVideo } from "../../redux/slices/videoSlice";

const VideoUploader = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedVideoId, setUploadedVideoId] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.video
  );

  const handleUpload = async () => {
    if (!videoFile || title.trim() === "" || description.trim() === "") {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);

    dispatch(uploadNewVideo(formData))
      .unwrap()
      .then((uploadedVideo) => {
        onUpload(uploadedVideo._id);
        setUploadedVideoId(uploadedVideo._id);
        setIsModalOpen(true);
        // Reset fields after upload
        setVideoFile(null);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Video upload failed:", error);
      });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-md max-w-md mx-auto">
      <h1 className="text-2xl text-white font-bold mb-4">Upload Video</h1>
      <div className="space-y-4">
        {isError && (
          <div className="text-red-500">
            {errorMessage || "Failed to upload video."}
          </div>
        )}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="block w-full text-white"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video Title"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Video Description"
          rows="4"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
        />
        <button
          onClick={handleUpload}
          className={`w-full py-2 ${
            isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md`}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Video Uploaded</h2>
            <p>Your video has been uploaded successfully!</p>
            <p>Video ID: {uploadedVideoId}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
