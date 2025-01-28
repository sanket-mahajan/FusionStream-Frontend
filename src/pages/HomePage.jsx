import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";

const Homepage = () => {
  const { user } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Fusion Stream</h1>
      <p>Explore trending videos, your subscriptions, and more!</p>
      {!user && !accessToken && (
        <div>
          <p>Sign in to start watching videos.</p>
          <LoginPage />
        </div>
      )}
    </div>
  );
};

export default Homepage;
