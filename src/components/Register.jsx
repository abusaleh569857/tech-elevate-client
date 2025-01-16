// import { useContext, useState } from "react";
// import { IoEye } from "react-icons/io5";
// import { IoMdEyeOff } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "./Firebase/Firebase_init";
// import { AuthContext } from "./Provider/AuthProvider";
// import UseTitle from "./Title/UseTitle";
// import axios from "axios";

// const Register = () => {
//   UseTitle();
//   const { registerUser, updateUserProfile } = useContext(AuthContext); // Destructure the functions from context
//   const navigate = useNavigate();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState({});
//   const [profilePicture, setProfilePicture] = useState(""); // State for the profile picture

//   const handleSignInForm = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setError({});

//     const name = e.target.name.value.trim();
//     const email = e.target.email.value.trim();
//     const password = e.target.password.value.trim();
//     const checkBox = e.target.terms.checked;
//     const photoURL = e.target.photo.value;

//     // Validations
//     if (name.length < 5) {
//       setError((prev) => ({
//         ...prev,
//         name: "Name must be at least 5 characters long.",
//       }));
//       return;
//     }

//     if (password.length < 6) {
//       setError((prev) => ({
//         ...prev,
//         password: "Password must be at least 6 characters long.",
//       }));
//       return;
//     }

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/\\`~]).{6,}$/;

//     if (!passwordRegex.test(password)) {
//       setError((prev) => ({
//         ...prev,
//         password:
//           "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
//       }));
//       return;
//     }

//     if (!checkBox) {
//       setErrorMessage("Please accept our terms & conditions!");
//       return;
//     }

//     try {
//       // Register the user using the provided email and password
//       const result = await registerUser(email, password);
//       if (result?.user) {
//         // Update the user profile (displayName, photoURL)
//         await updateUserProfile({ displayName: name, photoURL });

//         const userData = {
//           name,
//           email,
//           photoURL,
//           uid: result.user.uid,
//         };

//         // Save user data to the backend using axios
//         const response = await axios.post(
//           "http://localhost:5000/users",
//           userData
//         );

//         if (response.data?.userId) {
//           // If user data is saved, navigate to home page
//           setProfilePicture(photoURL); // Save profile picture to state
//           navigate("/"); // Redirect to home page after registration
//         } else {
//           setErrorMessage("Failed to save user data. Please try again.");
//         }
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message ||
//           "An error occurred during registration."
//       );
//     }
//   };

//   // Handle Google Login
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const firebaseUser = result.user;

//       const userData = {
//         name: firebaseUser.displayName,
//         photo: firebaseUser.photoURL,
//         email: firebaseUser.email,
//         uid: firebaseUser.uid,
//       };

//       // Save user data to backend using axios
//       const response = await axios.post(
//         "http://localhost:5000/users",
//         userData
//       );

//       if (response.data?.userId) {
//         // If user data is saved successfully, update profile and navigate
//         await updateUserProfile({
//           displayName: firebaseUser.displayName,
//           photoURL: firebaseUser.photoURL,
//         });

//         setProfilePicture(firebaseUser.photoURL); // Save profile picture to state
//         navigate("/"); // Redirect to home page after successful Google login
//       } else {
//         console.error("Failed to save user data to MongoDB.");
//       }
//     } catch (error) {
//       console.error("Google login error:", error.message);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center">
//       <div className="card bg-white shadow-lg w-full max-w-lg p-6 rounded-md mt-6 mb-6">
//         <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
//           Create Your TechElevate Account
//         </h2>
//         <form onSubmit={handleSignInForm}>
//           <div className="form-group mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               className="input input-bordered w-full mt-1"
//               required
//             />
//             {error.name && (
//               <p className="text-red-500 text-sm mt-1">{error.name}</p>
//             )}
//           </div>
//           <div className="form-group mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               className="input input-bordered w-full mt-1"
//               required
//             />
//           </div>
//           <div className="form-group mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Your Password"
//                 className="input input-bordered w-full mt-1"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-3 text-xl cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <IoEye /> : <IoMdEyeOff />}
//               </span>
//             </div>
//             {error.password && (
//               <p className="text-red-500 text-sm mt-1">{error.password}</p>
//             )}
//           </div>
//           <div className="form-group mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Profile Picture URL
//             </label>
//             <input
//               type="text"
//               name="photo"
//               placeholder="Enter Profile Picture URL"
//               className="input input-bordered w-full mt-1"
//               required
//             />
//           </div>
//           <div className="form-group mb-4">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="terms"
//                 className="checkbox checkbox-primary"
//               />
//               <span className="ml-2 text-sm text-gray-700">
//                 I agree to the{" "}
//                 <a href="#" className="text-blue-500 hover:underline">
//                   Terms & Conditions
//                 </a>
//               </span>
//             </label>
//           </div>
//           {errorMessage && (
//             <p className="text-red-500 text-center text-sm mb-4">
//               {errorMessage}
//             </p>
//           )}
//           <button className="btn btn-primary w-full" type="submit">
//             Register
//           </button>
//           <div className="text-center mt-4">
//             <p className="text-sm text-gray-600">Or Register with:</p>
//             <button
//               type="button"
//               onClick={handleGoogleLogin}
//               className="btn btn-outline btn-secondary mt-2"
//             >
//               Google
//             </button>
//           </div>
//           <div className="text-center mt-4 text-sm">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-blue-500 hover:underline font-medium"
//             >
//               Login
//             </Link>
//           </div>
//         </form>
//         {profilePicture && (
//           <div className="text-center mt-4">
//             <img
//               src={profilePicture}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mx-auto"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase/Firebase_init";
import { AuthContext } from "./Provider/AuthProvider";
import UseTitle from "./Title/UseTitle";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const Register = () => {
  UseTitle();
  const { registerUser, updateUserProfile } = useContext(AuthContext); // Destructure the functions from context
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [profilePicture, setProfilePicture] = useState(""); // State for the profile picture

  const handleSignInForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setError({});

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const checkBox = e.target.terms.checked;
    const photoURL = e.target.photo.value;

    // Validations
    if (name.length < 5) {
      setError((prev) => ({
        ...prev,
        name: "Name must be at least 5 characters long.",
      }));
      return;
    }

    if (password.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/\\`~]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError((prev) => ({
        ...prev,
        password:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
      return;
    }

    if (!checkBox) {
      setErrorMessage("Please accept our terms & conditions!");
      return;
    }

    try {
      // Register the user using the provided email and password
      const result = await registerUser(email, password);
      if (result?.user) {
        // Update the user profile (displayName, photoURL)
        await updateUserProfile({ displayName: name, photoURL });

        const userData = {
          name,
          email,
          photoURL,
          uid: result.user.uid,
        };

        // Save user data to the backend using axios
        const response = await axios.post(
          "http://localhost:5000/users",
          userData
        );

        if (response.data?.userId) {
          // If user data is saved, navigate to home page
          setProfilePicture(photoURL); // Save profile picture to state

          // SweetAlert Success Message
          Swal.fire({
            title: "Registration Successful!",
            text: "Your account has been created successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate("/"); // Redirect to home page after registration
        } else {
          setErrorMessage("Failed to save user data. Please try again.");
        }
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userData = {
        name: firebaseUser.displayName,
        photo: firebaseUser.photoURL,
        email: firebaseUser.email,
        uid: firebaseUser.uid,
      };

      // Save user data to backend using axios
      const response = await axios.post(
        "http://localhost:5000/users",
        userData
      );

      if (response.data?.userId) {
        // If user data is saved successfully, update profile and navigate
        await updateUserProfile({
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });

        setProfilePicture(firebaseUser.photoURL); // Save profile picture to state

        // SweetAlert Success Message
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back to TechElevate!",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/"); // Redirect to home page after successful Google login
      } else {
        console.error("Failed to save user data to MongoDB.");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center">
      <div className="card bg-white shadow-lg w-full max-w-lg p-6 rounded-md mt-6 mb-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Create Your TechElevate Account
        </h2>
        <form onSubmit={handleSignInForm}>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full mt-1"
              required
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password"
                className="input input-bordered w-full mt-1"
                required
              />
              <span
                className="absolute right-3 top-3 text-xl cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye /> : <IoMdEyeOff />}
              </span>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter Profile Picture URL"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-primary"
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center text-sm mb-4">
              {errorMessage}
            </p>
          )}
          <button className="btn btn-primary w-full" type="submit">
            Register
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Or Register with:</p>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-secondary mt-2"
            >
              Google
            </button>
          </div>
          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Login
            </Link>
          </div>
        </form>
        {profilePicture && (
          <div className="text-center mt-4">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
