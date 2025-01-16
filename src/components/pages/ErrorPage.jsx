import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center space-y-6">
        {/* 404 Heading */}
        <h1 className="text-9xl font-extrabold text-red-600">404</h1>

        {/* Error Message */}
        <p className="text-2xl font-semibold text-gray-800">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-gray-600">
          It seems you have hit a broken link or entered a wrong URL.
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 text-white bg-red-600 rounded-md text-lg font-medium hover:bg-red-700 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
