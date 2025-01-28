import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscribedChannels } from "../../redux/slices/subscriptionSlice";

const SubscribedChannels = () => {
  const { subscribedChannels } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSubscribedChannels(user._id));
  }, [dispatch, user]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mb-6">
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">
        Subscribed Channels
      </h2>
      {subscribedChannels.length > 0 ? (
        <ul className="space-y-4">
          {subscribedChannels.map((subs) => (
            <li
              key={subs._id}
              className="flex items-center p-4 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              <img
                src={subs.channel.avatar || "/default-avatar.png"} // Fallback to a default avatar
                alt="User avatar"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <span className="text-lg font-semibold">
                {subs.channel.fullName}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No subscribed channels yet.</p>
      )}
    </div>
  );
};

export default SubscribedChannels;
