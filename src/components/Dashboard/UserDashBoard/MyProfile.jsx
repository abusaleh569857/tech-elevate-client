import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import PaymentStripe from "./PaymentStripe";
import axios from "axios";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(AuthContext); // Use AuthContext for user details only
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch subscription status on component mount
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `https://tech-elevate-server.vercel.app/users?email=${user.email}`
          );
          console.log(response.data.isSubscribed);
          if (response.data.isSubscribed) {
            setIsSubscribed(true); // Update subscription state
          }
        } catch (error) {
          console.error("Error fetching subscription status:", error);
        }
      }
    };

    fetchSubscriptionStatus();
  }, [user?.email]);

  const handleSubscribe = () => {
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    const subscriptionDate = new Date().toISOString(); // Current date
    const email = user?.email; // Ensure email is available in user object

    try {
      // API call to update subscription status
      const response = await axios.put(
        "https://tech-elevate-server.vercel.app/update-subscription",
        {
          email: email,
          isSubscribed: true,
          subscriptionDate: subscriptionDate,
        }
      );
      console.log(response.data.success);

      if (response.data.success) {
        setIsSubscribed(true); // Update local state

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "You are now subscribed!",
        });
        setIsModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Subscription Failed",
          text: "Subscription update failed. Please contact support.",
        });
      }
    } catch (error) {
      console.error("Error updating subscription:", error);

      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: "Subscription update failed. Please try again.",
      });
    }
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
        {isSubscribed ? (
          <p className="text-lg mt-4 text-green-600 font-semibold">
            Membership Status: Verified
          </p>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleSubscribe}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Subscribe for $20
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <PaymentStripe
          amount={20}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyProfile;
