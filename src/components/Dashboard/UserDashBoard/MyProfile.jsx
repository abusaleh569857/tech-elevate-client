import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribe = () => {
    // Open the payment modal
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Handle payment success logic (e.g., updating user subscription in the backend)
    alert("Payment successful! You are now subscribed.");
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full mb-4"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl mb-4">
            <span>{user?.displayName?.[0]?.toUpperCase() || "U"}</span>
          </div>
        )}
        <p className="text-lg font-semibold">
          Name: {user?.displayName || "N/A"}
        </p>
        <p className="text-lg">Email: {user?.email || "N/A"}</p>

        {/* Membership Section */}
        {user?.isSubscribed ? (
          <p className="text-lg mt-4 text-green-600 font-semibold">
            Membership Status: Verified
          </p>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleSubscribe}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Subscribe for $10
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Complete Your Payment</h3>
            <p className="mb-6">
              Subscribe for just $10 to enjoy membership benefits.
            </p>
            <button
              onClick={handlePaymentSuccess}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 mb-4"
            >
              Pay $10
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
