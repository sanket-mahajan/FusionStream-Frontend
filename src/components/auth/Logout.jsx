import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Dispatch logout action to Redux
    await dispatch(logout());
    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken"); // If you're using refresh tokens

    // Redirect to login page
    navigate("/");
  };

  return handleLogout;
};

export default useLogout;
