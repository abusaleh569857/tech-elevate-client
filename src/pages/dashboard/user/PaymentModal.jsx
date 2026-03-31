import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { showAlert } from "@/shared/lib/alert.js";
import { couponApi } from "@/services/api/couponApi.js";
import { paymentApi } from "@/services/api/paymentApi.js";

const PaymentModal = ({ amount, onPaymentSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(amount);

  const handleApplyCoupon = async () => {
    try {
      const response = await couponApi.validateCoupon(couponCode);

      if (response.success) {
        setDiscount(response.discount);
        const discountedAmount = amount - (amount * response.discount) / 100;
        setFinalAmount(Number(discountedAmount.toFixed(2)));

        showAlert({
          icon: "success",
          title: "Coupon applied",
          text: `You received a ${response.discount}% discount.`,
        });
      } else {
        showAlert({
          icon: "error",
          title: "Invalid coupon",
          text: response.message,
        });
      }
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Coupon check failed",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await paymentApi.createPaymentIntent(finalAmount * 100);
      const clientSecret = response.clientSecret;
      const card = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "TechElevate Member",
          },
        },
      });

      if (paymentResult.error) {
        showAlert({
          icon: "error",
          title: "Payment failed",
          text: paymentResult.error.message,
        });
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Payment failed",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
        <h3 className="text-2xl font-black text-slate-900">Complete Your Payment</h3>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="w-full rounded-full border border-cyan-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-cyan-700"
          >
            Apply Coupon
          </button>
          {discount > 0 ? (
            <p className="text-sm font-semibold text-emerald-600">Discount applied: {discount}%</p>
          ) : null}
          <p className="text-lg font-black text-slate-900">Total Amount: ${finalAmount}</p>
          <div className="rounded-2xl border border-slate-200 p-4">
            <CardElement />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePayment}
              className="flex-1 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white"
            >
              Pay ${finalAmount}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  amount: PropTypes.number.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentModal;



