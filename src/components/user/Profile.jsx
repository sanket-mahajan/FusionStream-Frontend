import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { avatar, coverImage } from "../../redux/slices/userSlice";
import { fetchCurrentUser } from "../../redux/slices/authSlice";
import {
  fetchChannelSubscribers,
  fetchSubscribedChannels,
} from "../../redux/slices/subscriptionSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { subscribedChannels, channelSubscribers } = useSelector(
    (state) => state.subscription
  );
  const isLoading = useSelector((state) => state.user.isLoading);

  const avatarInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      await dispatch(avatar(formData));
      dispatch(fetchCurrentUser()); // Fetch updated pr
    }
  };

  const handleCoverImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("coverImage", file);
      await dispatch(coverImage(formData));
      dispatch(fetchCurrentUser()); // Fetch updated profile
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchSubscribedChannels(user?._id));
    dispatch(fetchChannelSubscribers(user?._id));
  }, [dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Cover Image */}
          <div className="relative">
            <img
              src={user.coverImage}
              alt="Cover"
              className="w-full h-48 object-cover"
            />
            <button
              className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded-md text-sm opacity-75 hover:opacity-100"
              onClick={() => coverImageInputRef.current.click()}
            >
              Update Cover
            </button>
            <input
              type="file"
              accept="image/*"
              ref={coverImageInputRef}
              className="hidden"
              onChange={handleCoverImageChange}
            />
          </div>

          {/* Profile Info */}
          <div className="flex items-center p-4">
            <div className="relative w-24 h-24">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                className="absolute bottom-0 right-0 bg-black text-white px-2 py-1 rounded-full text-sm opacity-75 hover:opacity-100"
                onClick={() => avatarInputRef.current.click()}
              >
                Update
              </button>
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{user.fullName}</h2>
              <p className="text-gray-600">@{user.username}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xl font-bold">{subscribedChannels.length}</p>
                <p className="text-gray-600">Subscribed Channels</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{channelSubscribers.length}</p>
                <p className="text-gray-600">Subscribers</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
