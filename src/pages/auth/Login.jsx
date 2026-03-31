import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  clearAuthError,
  loginWithEmail,
  loginWithGoogle,
} from "@/features/auth";
import Button from "@/shared/ui/Button.jsx";
import FormInput from "@/shared/ui/FormInput.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";
import UseTitle from "@/shared/hooks/useDocumentTitle.jsx";

const EyeOpenIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1.5 12s3.8-6 10.5-6 10.5 6 10.5 6-3.8 6-10.5 6S1.5 12 1.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 3l18 18" strokeLinecap="round" />
    <path d="M10.6 6.3A11.8 11.8 0 0 1 12 6c6.7 0 10.5 6 10.5 6a18 18 0 0 1-3 3.7" />
    <path d="M6.1 6.9C3.6 8.7 1.5 12 1.5 12a18 18 0 0 0 10.5 6c1.1 0 2.2-.2 3.2-.5" />
  </svg>
);

const Login = () => {
  UseTitle();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async (values) => {
    dispatch(clearAuthError());

    const result = await dispatch(loginWithEmail(values));

    if (loginWithEmail.fulfilled.match(result)) {
      reset();
      await showAlert({
        title: "Login successful",
        text: "Welcome back to TechElevate.",
        icon: "success",
      });
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLogin = async () => {
    const result = await dispatch(loginWithGoogle());

    if (loginWithGoogle.fulfilled.match(result)) {
      await showAlert({
        title: "Login successful",
        text: "You are now signed in with Google.",
        icon: "success",
      });
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#99f6e4_0%,#e0f2fe_38%,#082f49_100%)] px-4 py-10">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/40 bg-white/90 p-8 shadow-[0_32px_80px_rgba(8,47,73,0.24)] backdrop-blur">
        <SectionHeader
          eyebrow="Welcome Back"
          title="Sign In To Continue"
          description="Access your products, dashboard actions, and community workflow from one secure place."
        />

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />

          <div className="relative">
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              error={errors.password?.message}
              className="pr-12"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
              })}
            />
            <button
              type="button"
              className="absolute right-4 top-11 text-slate-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </div>

          {error ? (
            <p className="text-sm font-semibold text-rose-600">{error}</p>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 space-y-4 text-center">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Continue With Google
          </Button>
          <p className="text-sm text-slate-600">
            Do not have an account?{" "}
            <Link to="/register" className="font-semibold text-cyan-700 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
