import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from "./PaymentModal";

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

PaymentStripe.propTypes = {
  amount: PropTypes.number.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentStripe;

