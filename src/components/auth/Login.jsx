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

  const cleanErrorMessage = (error) => {
    if (!error) return "";

    // Extract the main error message from HTML response
    const match = error.match(/Error: (.*?)(<br>|<\/pre>)/);
    if (match && match[1]) {
      return `Invalid credentials: ${match[1].replace("exists", "exist")}`;
    }

    // Fallback error messages
    if (error.includes("Network Error"))
      return "Connection failed. Check your internet";
    return "An unexpected error occurred";
  };

  //   return (
  //     <div className="flex justify-center items-center h-screen bg-gray-100">
  //       <form
  //         onSubmit={handleLogin}
  //         className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
  //       >
  //         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
  //         {isError && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">Email</label>
  //           <input
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             placeholder="Enter your email"
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium mb-1">Password</label>
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             placeholder="Enter your password"
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
  //           disabled={isLoading}
  //           onClick={handleLogin}
  //         >
  //           {isLoading ? "Logging in..." : "Login"}
  //         </button>

  //         {/* Register link moved just below the submit button */}
  //         <div className="flex justify-between pt-4">
  //           <p className="inline-block text-left">If not Registered Already</p>
  //           <button
  //             type="button"
  //             className="text-blue-500 hover:underline text-right"
  //             onClick={() => navigate("/register")}
  //           >
  //             Register here
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  // export default Login;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to Fusion Stream
          </h1>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        {isError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-sm font-medium">
              ⚠️ {cleanErrorMessage(errorMessage)}
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
