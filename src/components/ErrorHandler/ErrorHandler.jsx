import { useNavigate } from "react-router-dom";

const ErrorHandler = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Error Please Login Again</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default ErrorHandler;
