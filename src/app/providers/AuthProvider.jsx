import { useEffect } from "react";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import { syncAuthSession } from "@/features/auth";
import { getFirebaseAuthClient } from "@/lib/firebase/firebaseClient.js";

const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const { initialized, sessionLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let unsubscribe = () => undefined;

    getFirebaseAuthClient().then(({ auth, onAuthStateChanged }) => {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        dispatch(syncAuthSession(currentUser));
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!initialized || sessionLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
            Loading session
          </p>
        </div>
      </div>
    );
  }

  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
