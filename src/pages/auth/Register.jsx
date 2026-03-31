import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  clearAuthError,
  loginWithGoogle,
  registerWithEmail,
} from "@/features/auth";
import Button from "@/shared/ui/Button.jsx";
import FormCheckbox from "@/shared/ui/FormCheckbox.jsx";
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/\\`~]).{6,}$/;

const Register = () => {
  UseTitle();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      photo: "",
      password: "",
      terms: false,
    },
  });

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const onSubmit = async (values) => {
    dispatch(clearAuthError());

    const result = await dispatch(
      registerWithEmail({
        name: values.name,
        email: values.email,
        password: values.password,
        photoURL: values.photo,
      })
    );

    if (registerWithEmail.fulfilled.match(result)) {
      reset();
      await showAlert({
        title: "Registration successful",
        text: "Your account is ready.",
        icon: "success",
      });
      navigate("/", { replace: true });
    }
  };

  const handleGoogleRegister = async () => {
    const result = await dispatch(loginWithGoogle());

    if (loginWithGoogle.fulfilled.match(result)) {
      await showAlert({
        title: "Welcome to TechElevate",
        text: "Your Google account is now connected.",
        icon: "success",
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#0f172a_0%,#155e75_45%,#ecfeff_100%)] px-4 py-10">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/20 bg-white/95 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.3)]">
        <SectionHeader
          eyebrow="Build Your Account"
          title="Join TechElevate Today"
          description="Create your creator profile once and manage product launches, subscriptions, and dashboard actions from one workflow."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5 md:grid-cols-2">
          <FormInput
            label="Full Name"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register("name", {
              required: "Full name is required.",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters long.",
              },
            })}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: emailPattern,
                message: "Please enter a valid email address.",
              },
            })}
          />

          <FormInput
            label="Profile Picture URL"
            type="url"
            placeholder="https://..."
            error={errors.photo?.message}
            containerClassName="md:col-span-2"
            {...register("photo", {
              required: "Profile picture URL is required.",
              pattern: {
                value: /^https?:\/\/.+/i,
                message: "Please enter a valid profile picture URL.",
              },
            })}
          />

          <div className="relative md:col-span-2">
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              error={errors.password?.message}
              className="pr-12"
              {...register("password", {
                required: "Password is required.",
                pattern: {
                  value: passwordPattern,
                  message:
                    "Password needs uppercase, lowercase, number, special character, and 6+ length.",
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

          <FormCheckbox
            label="I agree to the platform terms and community guidelines."
            error={errors.terms?.message}
            containerClassName="md:col-span-2"
            {...register("terms", {
              required: "Please accept the terms and conditions.",
            })}
          />

          {error ? (
            <p className="text-sm font-medium text-rose-600 md:col-span-2">{error}</p>
          ) : null}

          <Button type="submit" className="w-full md:col-span-2" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 space-y-4 text-center">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            Register With Google
          </Button>
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-cyan-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
