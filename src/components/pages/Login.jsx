import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/Firebase_init";
import UseTitle from "../Title/UseTitle";
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  UseTitle();
  const { loginUser, loading, error, setError } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    e.target.reset();

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const result = await loginUser(email, password);
      if (result && result.user) {
        console.log("Login successful:", result.user);

        // Show success message with SweetAlert
        Swal.fire({
          title: "Login Successful!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/"); // Redirect to home page
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);

      // Show error message with SweetAlert
      Swal.fire({
        title: "Login Failed!",
        text: "An error occurred while logging in. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        console.log("Google login successful:", user);

        // Show success message with SweetAlert
        Swal.fire({
          title: "Login Successful!",
          text: "You have successfully logged in with Google.",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("Google login error:", error.message);
      setError("Failed to log in with Google. Please try again later.");

      // Show error message with SweetAlert
      Swal.fire({
        title: "Google Login Failed!",
        text: "An error occurred while logging in with Google. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5 md:w-2/3 lg:w-1/2">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Login Now
        </h2>
        <form className="space-y-5 mt-5" onSubmit={handleSignIn}>
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="text-2xl absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye /> : <IoMdEyeOff />}
            </span>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline mt-2 block text-right"
            >
              Forgot password?
            </Link>
          </div>
          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}
          <button
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </p>
          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full py-3 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
