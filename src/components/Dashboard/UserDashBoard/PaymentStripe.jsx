import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from "./PaymentModal";

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentStripe = ({ amount, onPaymentSuccess, onCancel }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentModal
        amount={amount}
        onPaymentSuccess={onPaymentSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
};

export default PaymentStripe;

// import.meta.env.STRIPE_PUBLISHABLE_KEY
