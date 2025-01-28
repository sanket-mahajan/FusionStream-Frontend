import { Link } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg">
        Oops! The page you&apos;re looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Homepage
      </Link>
      <ErrorHandler />
    </div>
  );
};

export default ErrorPage;
