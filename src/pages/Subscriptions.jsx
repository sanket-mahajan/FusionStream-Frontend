import SubscribedChannels from "../components/subsciptions/SubscribedChannels";
import Subscribers from "../components/subsciptions/Subscribers";

const Subscriptions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Subscriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscribedChannels />
        <Subscribers />
      </div>
    </div>
  );
};

export default Subscriptions;
