// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import Swal from "sweetalert2";

// const PaymentModal = ({ amount, onPaymentSuccess, onCancel }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(amount);

//   const handleApplyCoupon = async () => {
//     try {
//       const response = await axios.post(
//         "https://tech-elevate-server.vercel.app/validate-coupon",
//         {
//           couponCode,
//         }
//       );

//       if (response.data.success) {
//         setDiscount(response.data.discount);
//         const discountedAmount =
//           amount - (amount * response.data.discount) / 100;
//         setFinalAmount(discountedAmount.toFixed(2));

//         Swal.fire({
//           icon: "success",
//           title: "Coupon Applied",
//           text: `You got a ${response.data.discount}% discount!`,
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Invalid Coupon",
//           text: response.data.message,
//         });
//       }
//     } catch (error) {
//       console.error("Error validating coupon:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Unable to validate coupon. Please try again.",
//       });
//     }
//   };

//   const handlePayment = async () => {
//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);

//     try {
//       // Request client secret from the server
//       const response = await axios.post(
//         "https://tech-elevate-server.vercel.app/create-payment-intent",
//         { amount: finalAmount * 100 } // Stripe expects the amount in cents
//       );

//       // Extract clientSecret
//       const clientSecret = response.data.clientSecret;

//       if (!clientSecret) {
//         console.error("No client secret returned by the server");
//         return;
//       }

//       // Confirm Card Payment
//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card,
//           billing_details: {
//             name: "Test User",
//           },
//         },
//       });

//       // Handle Payment Result
//       if (paymentResult.error) {
//         Swal.fire({
//           icon: "error",
//           title: "Payment Failed",
//           text: paymentResult.error.message,
//         });
//       } else if (paymentResult.paymentIntent.status === "succeeded") {
//         onPaymentSuccess();
//       }
//     } catch (error) {
//       console.error("Error during payment process:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Payment Failed",
//         text: "Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h3 className="text-xl font-bold mb-4">Complete Your Payment</h3>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Enter Coupon Code"
//             value={couponCode}
//             onChange={(e) => setCouponCode(e.target.value)}
//             className="border p-2 rounded-lg w-full"
//           />
//           <button
//             onClick={handleApplyCoupon}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2 w-full"
//           >
//             Apply Coupon
//           </button>
//         </div>
//         {discount > 0 && (
//           <p className="text-green-600 font-semibold mb-4">
//             Discount Applied: {discount}% Off
//           </p>
//         )}
//         <p className="text-lg font-bold mb-4">Total Amount: ${finalAmount}</p>
//         <CardElement className="border p-2 rounded-lg mb-4" />
//         <button
//           onClick={handlePayment}
//           className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 mb-4 w-full"
//         >
//           Pay ${finalAmount}
//         </button>
//         <button
//           onClick={onCancel}
//           className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 mt-4 mx-auto block"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentModal = ({ amount, onPaymentSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(amount);

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        "https://tech-elevate-server.vercel.app/validate-coupon",
        {
          couponCode,
        }
      );

      if (response.data.success) {
        setDiscount(response.data.discount);
        const discountedAmount =
          amount - (amount * response.data.discount) / 100;
        setFinalAmount(discountedAmount.toFixed(2));

        Swal.fire({
          icon: "success",
          title: "Coupon Applied",
          text: `You got a ${response.data.discount}% discount!`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Coupon",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to validate coupon. Please try again.",
      });
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    try {
      const response = await axios.post(
        "https://tech-elevate-server.vercel.app/create-payment-intent",
        { amount: finalAmount * 100 }
      );

      const clientSecret = response.data.clientSecret;

      if (!clientSecret) {
        console.error("No client secret returned by the server");
        return;
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Test User",
          },
        },
      });

      if (paymentResult.error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: paymentResult.error.message,
        });
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Error during payment process:", error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h3 className="text-xl font-bold mb-4">Complete Your Payment</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2 w-full"
          >
            Apply Coupon
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-600 font-semibold mb-4">
            Discount Applied: {discount}% Off
          </p>
        )}
        <p className="text-lg font-bold mb-4">Total Amount: ${finalAmount}</p>
        <CardElement className="border p-2 rounded-lg mb-4" />
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 mb-4 w-full"
        >
          Pay ${finalAmount}
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 mt-4 mx-auto block"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
