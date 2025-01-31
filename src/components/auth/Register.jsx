import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // State to handle success dialog
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", userData.name);
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar); // Add the file object

    const response = await dispatch(register(formData));
    if (response.type === "auth/register/fulfilled") {
      setIsSuccess(true); // Show success dialog
    }
  };

  const handleDialogClose = () => {
    setIsSuccess(false); // Close the dialog
    navigate("/login"); // Navigate to login
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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {isError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-sm font-medium">
              ⚠️ {cleanErrorMessage(errorMessage)}
            </p>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <div className="flex justify-between pt-4">
          <p className="inline-block text-left">Already have an Account?</p>
          <button
            type="button"
            className="text-blue-500 hover:underline text-right"
            onClick={() => navigate("/login")}
          >
            Login here
          </button>
        </div>
      </form>

      {/* Success Dialog */}
      {isSuccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Registration Successful
            </h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Your account has been created successfully! You can now log in.
            </p>
            <button
              onClick={handleDialogClose}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
