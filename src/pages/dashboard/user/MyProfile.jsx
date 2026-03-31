import { lazy, Suspense, useEffect, useState } from "react";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  refreshCurrentUserProfile,
  subscribeToMembership,
} from "@/features/auth";

const PaymentStripe = lazy(() => import("./PaymentStripe.jsx"));

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const { user, profile } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      dispatch(refreshCurrentUserProfile(user.email));
    }
  }, [dispatch, user?.email]);

  const handlePaymentSuccess = async () => {
    const result = await dispatch(
      subscribeToMembership({
        email: user.email,
        isSubscribed: true,
        subscriptionDate: new Date().toISOString(),
      })
    );

    if (subscribeToMembership.fulfilled.match(result)) {
      await showAlert({
        icon: "success",
        title: "Payment successful",
        text: "Your membership has been activated.",
      });
      setIsModalOpen(false);
    } else {
      showAlert({
        icon: "error",
        title: "Subscription failed",
        text: result.payload,
      });
    }
  };

  const isSubscribed = Boolean(profile?.isSubscribed);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Account Center</p>
      <h2 className="mt-3 text-3xl font-black text-slate-900">My Profile</h2>
      <div className="mt-8 rounded-[1.75rem] bg-[linear-gradient(135deg,#082f49_0%,#155e75_48%,#14b8a6_100%)] p-6 text-white shadow-[0_24px_60px_rgba(8,47,73,0.18)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="h-24 w-24 rounded-full border-4 border-white/40 object-cover" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/40 bg-white/10 text-4xl font-black">
              {user?.displayName?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <div className="space-y-2">
            <p className="text-2xl font-black">{user?.displayName || "N/A"}</p>
            <p className="text-white/80">{user?.email || "N/A"}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">
              {isSubscribed ? "Verified Member" : "Standard Member"}
            </p>
          </div>
        </div>
        {!isSubscribed ? (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-emerald-100"
          >
            Subscribe For $20
          </button>
        ) : null}
      </div>

      {isModalOpen ? (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
              <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Loading payment gateway...
                </p>
              </div>
            </div>
          }
        >
          <PaymentStripe
            amount={20}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => setIsModalOpen(false)}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default MyProfile;



