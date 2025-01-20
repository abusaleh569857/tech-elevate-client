import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase_init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Sign out from Firebase
      await signOut(auth);

      console.log("Successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(true);
      if (currentUser) {
        const token = localStorage.getItem("userToken");
        if (token) {
          setLoading(false);
        } else {
          const userInfo = { email: currentUser.email };
          axios
            .post("https://tech-elevate-server.vercel.app/jwt", userInfo)
            .then((res) => {
              if (res.data.token) {
                localStorage.setItem("userToken", res.data.token);
                setLoading(false);
              }
            })
            .catch((error) => {
              console.error("Error fetching token", error);
              setLoading(false);
            });
        }
      } else {
        localStorage.removeItem("userToken");
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,

    loading,
    error,
    registerUser,
    loginUser,
    logout,
    updateUserProfile,
    setError,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-700 mt-4">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../Firebase/Firebase_init";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   console.log("token", token);

//   const registerUser = async (email, password) => {
//     setLoading(true);
//     try {
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       return result;
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//       throw error;
//     }
//   };

//   const loginUser = async (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password).catch((error) => {
//       setLoading(false);
//       setError(error.message);
//     });
//   };

//   const logout = async () => {
//     setLoading(true);
//     try {
//       await signOut(auth);

//       setToken(null); // লগআউটের সময় টোকেন ক্লিয়ার
//       console.log("Successfully logged out");
//     } catch (error) {
//       console.error("Error during logout:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUserProfile = (updatedData) => {
//     return updateProfile(auth.currentUser, updatedData);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       setLoading(true);

//       if (currentUser) {
//         const token = localStorage.getItem("access-token");
//         setToken(token);
//         if (token) {
//           setLoading(false);
//         } else {
//           const userInfo = { email: currentUser.email };
//           axios
//             .post("https://tech-elevate-server.vercel.app/jwt", userInfo)
//             .then((res) => {
//               console.log(res.data);
//               if (res.data.token) {
//                 localStorage.setItem("access-token", res.data.token);
//                 setLoading(false);
//               }
//             })
//             .catch((error) => {
//               console.error("Error fetching token", error);
//               setLoading(false);
//             });
//         }
//       } else {
//         localStorage.removeItem("access-token");
//         setLoading(false);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const authInfo = {
//     user,
//     token,
//     loading,
//     error,
//     registerUser,
//     loginUser,
//     logout,
//     updateUserProfile,
//     setError,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {loading ? (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-lg font-medium text-gray-700 mt-4">
//               Loading, please wait...
//             </p>
//           </div>
//         </div>
//       ) : (
//         children
//       )}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
