import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVideo } from "../../redux/slices/videoSlice"; // Assuming slice path
import { useNavigate } from "react-router-dom";

const EditVideo = ({ video }) => {
  const [title, setTitle] = useState(video.title || "");
  const [description, setDescription] = useState(video.description || "");
  const [thumbnail, setThumbnail] = useState(video.thumbnail || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setDescription(video.description || "");
      setThumbnail(video.thumbnail || "");
    }
  }, [video]);

  const handleSave = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and description are required.");
      return;
    }

    console.log("Updating video:", title, description, thumbnail);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail); // Add the file

    dispatch(updateVideo({ videoId: video._id, data: formData }))
      .unwrap()
      .then(() => {
        alert("Video updated successfully!");
        navigate(-1); // Go back to the previous page
      })
      .catch((err) => {
        console.error("Error updating video:", err);
      });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-md max-w-md mx-auto">
      <h1 className="text-2xl text-white font-bold mb-4">Edit Video</h1>
      <div className="space-y-4">
        {isError && (
          <div className="text-red-500">
            {errorMessage || "An error occurred."}
          </div>
        )}
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
          rows="5"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
        <button
          onClick={handleSave}
          className={`w-full py-2 ${
            isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={() => navigate(-1)}
          className={`w-full py-2 ${
            isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md`}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditVideo;
