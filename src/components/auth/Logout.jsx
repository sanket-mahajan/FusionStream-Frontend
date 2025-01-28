import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken"); // If you're using refresh tokens

    // Dispatch logout action to Redux
    dispatch(logout());

    // Redirect to login page
    navigate("/login");
  };

  return handleLogout;
};

export default useLogout;
