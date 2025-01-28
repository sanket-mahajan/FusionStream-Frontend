import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "../../redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(null);

  // Check for accessToken in localStorage
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const verifyUser = async () => {
      if (!accessToken) {
        setIsVerified(false);
        return;
      }

      try {
        const response = await dispatch(fetchCurrentUser()).unwrap();
        if (response) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error("User verification failed:", error);
        setIsVerified(false);
      }
    };

    verifyUser();
  }, [accessToken, dispatch]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  return isVerified ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
