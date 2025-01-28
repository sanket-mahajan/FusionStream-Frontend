import { useState } from "react";
import { toggleSubscription } from "../../api/subscription";

const SubscribeButton = ({ channelId, initialSubscribed }) => {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);

  const handleToggleSubscription = async () => {
    await toggleSubscription(channelId);
    setIsSubscribed(!isSubscribed);
  };

  return (
    <button
      onClick={handleToggleSubscription}
      className={`${
        isSubscribed
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white px-4 py-2 rounded-md`}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
