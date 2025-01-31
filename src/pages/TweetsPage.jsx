import CreateTweet from "../components/tweet/CreateTweet";
import GetAllTweets from "../components/tweet/GetAllTweets";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Tweet Manager</h1>
      <div className="w-full max-w-2xl">
        <CreateTweet />
        <GetAllTweets />
      </div>
    </div>
  );
};

export default App;
