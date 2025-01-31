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
    // <div className="max-w-4xl mx-auto p-4">
    //   {isLoading ? (
    //     <p className="text-center text-gray-500">Loading...</p>
    //   ) : (
    //     <div className="bg-white shadow rounded-lg overflow-hidden">
    //       {/* Cover Image */}
    //       <div className="relative">
    //         <img
    //           src={user.coverImage}
    //           alt="Cover"
    //           className="w-full h-48 object-cover"
    //         />
    //         <button
    //           className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded-md text-sm opacity-75 hover:opacity-100"
    //           onClick={() => coverImageInputRef.current.click()}
    //         >
    //           Update Cover
    //         </button>
    //         <input
    //           type="file"
    //           accept="image/*"
    //           ref={coverImageInputRef}
    //           className="hidden"
    //           onChange={handleCoverImageChange}
    //         />
    //       </div>

    //       {/* Profile Info */}
    //       <div className="flex items-center p-4">
    //         <div className="relative w-24 h-24">
    //           <img
    //             src={user.avatar}
    //             alt="Avatar"
    //             className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
    //           />
    //           <button
    //             className="absolute bottom-0 right-0 bg-black text-white px-2 py-1 rounded-full text-sm opacity-75 hover:opacity-100"
    //             onClick={() => avatarInputRef.current.click()}
    //           >
    //             Update
    //           </button>
    //           <input
    //             type="file"
    //             accept="image/*"
    //             ref={avatarInputRef}
    //             className="hidden"
    //             onChange={handleAvatarChange}
    //           />
    //         </div>
    //         <div className="ml-4">
    //           <h2 className="text-2xl font-semibold">{user.fullName}</h2>
    //           <p className="text-gray-600">@{user.username}</p>
    //           <p className="text-gray-600">Email: {user.email}</p>
    //         </div>
    //       </div>

    //       {/* Stats */}
    //       <div className="p-4">
    //         <div className="grid grid-cols-2 gap-4">
    //           <div className="text-center">
    //             <p className="text-xl font-bold">{subscribedChannels.length}</p>
    //             <p className="text-gray-600">Subscribed Channels</p>
    //           </div>
    //           <div className="text-center">
    //             <p className="text-xl font-bold">{channelSubscribers.length}</p>
    //             <p className="text-gray-600">Subscribers</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="flex -mt-12 px-6 space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-4 py-4">
              <div className="h-6 bg-gray-200 w-1/3 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Cover Image Section */}
          <div className="relative h-64 bg-gray-100">
            <img
              src={user.coverImage || "/default-cover.jpg"}
              alt="Cover"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10" />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => coverImageInputRef.current.click()}
                className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-white/100 transition-all shadow-sm hover:shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
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
          </div>

          {/* Profile Section */}
          <div className="px-6 pb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6 -mt-16">
              {/* Reduced negative margin */}
              <div className="relative group w-full sm:w-auto">
                <img
                  src={user.avatar || "/default-avatar.jpg"}
                  alt="Avatar"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => avatarInputRef.current.click()}
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={avatarInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="flex-1 space-y-2 sm:mt-0 pt-20">
                {" "}
                {/* Added top margin for mobile */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
                  {user.fullName}
                </h1>
                <p className="text-lg text-gray-600 break-words">
                  @{user.username}
                </p>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <svg
                      className="w-8 h-8 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {subscribedChannels.length}
                    </p>
                    <p className="text-sm text-gray-500">Subscribed Channels</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {channelSubscribers.length}
                    </p>
                    <p className="text-sm text-gray-500">Subscribers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
