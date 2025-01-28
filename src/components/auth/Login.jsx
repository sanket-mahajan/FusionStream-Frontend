import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage, accessToken } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(login({ email, password })).unwrap(); // Unwrap the resolved action
      console.log("Login successful:", response);

      // Save accessToken from response payload
      localStorage.setItem("accessToken", accessToken);

      // Navigate to videos page
      navigate("/videos");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {isError && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Register link moved just below the submit button */}
        <div className="flex justify-between pt-4">
          <p className="inline-block text-left">If not Registered Already</p>
          <button
            type="button"
            className="text-blue-500 hover:underline text-right"
            onClick={() => navigate("/register")}
          >
            Register here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
