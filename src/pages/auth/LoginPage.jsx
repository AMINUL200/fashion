import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft, Dumbbell, Shield } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/app";
import PageHelmet from "../../component/common/PageHelmet";
import { useApp } from "../../context/AppContext";

const LoginPage = () => {
  const { contactData } = useApp();
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  console.log("Redirect to:", redirectTo);
  console.log("Location state:", location.state);

  const { login, isAuthenticated, loading: authLoading, user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading && !redirectAttempted) {
      console.log(
        "User already authenticated, redirecting based on role:",
        user?.role,
      );
      if (user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }
      setRedirectAttempted(true);
    }
  }, [
    isAuthenticated,
    authLoading,
    navigate,
    redirectTo,
    user,
    redirectAttempted,
  ]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (validateForm()) {
      setIsLoading(true);

      try {
        const result = await api.post("/login", formData);

        console.log("Login response:", result.data);

        // Check if login was successful
        if (result.data.status) {
          // Call login function from AuthContext
          await login(result.data.data.user, result.data.data.token);

          // Log user role for debugging
          console.log("User role:", result.data.data.user.role);

          // Force a small delay to ensure auth state updates
          setTimeout(() => {
            // Redirect based on role
            if (
              result.data.data.user.role === "admin" ||
              result.data.data.user.role === "accounts" ||
              result.data.data.user.role === "sales"
            ) {
              console.log("Redirecting to admin dashboard...");
              navigate("/admin", { replace: true });
            } else {
              console.log("Redirecting to:", redirectTo);
              navigate(redirectTo, { replace: true });
            }
          }, 100);
        } else {
          setApiError(result.data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setApiError(
          error.response?.data?.message ||
            error.message ||
            "Login failed. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#D19701" }}
          ></div>
          <p className="text-[#666666]">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHelmet title="Login - APSARA" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        {/* Background decoration - Gold Theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #D19701 0%, transparent 70%)' }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5"
            style={{ background: 'radial-gradient(circle, #B67E00 0%, transparent 70%)' }}
          ></div>

          {/* Decorative gold circles */}
          <div className="absolute top-1/4 left-10 w-16 h-16 border border-[#D19701]/10 rounded-full"></div>
          <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-[#D19701]/10 rounded-full"></div>
          <div className="absolute top-1/2 right-20 w-8 h-8 border border-[#D19701]/10 rounded-full"></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Back button - Gold Theme */}
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center space-x-2 transition-colors group text-[#666666] hover:text-[#D19701]"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>

          {/* Login Card - Gold Theme */}
          <div className="rounded-2xl shadow-2xl p-8 bg-white border border-[#EFE7C8]">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-2xl shadow-lg bg-[#FDFBD4] border-2 border-[#EFE7C8]">
                  <img
                    src={`/image/logo.png`}
                    alt={contactData?.site_name || "APSARA"}
                    className="h-20 w-auto object-contain"
                  />
                </div>
              </div>
              <h2 className="font-heading text-3xl font-bold mb-2" style={{ color: '#D19701' }}>
                Welcome Back
              </h2>
              <p className="text-[#666666] text-sm">Sign in to continue to APSARA</p>
            </div>

            {/* API Error Message - Gold Theme */}
            {apiError && (
              <div className="mb-6 p-4 rounded-lg bg-[#FDFBD4] border border-[#D19701]/50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5"
                      style={{ color: "#D19701" }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm" style={{ color: '#B67E00' }}>{apiError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  borderColor={errors.email ? "#D19701" : "#EFE7C8"}
                  focusColor="#D19701"
                  className="bg-transparent"
                  labelClassName="text-[#111111] font-medium"
                  inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                />
                {errors.email && (
                  <p className="mt-2 text-sm flex items-center" style={{ color: '#B67E00' }}>
                    <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: '#D19701' }}></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  borderColor={errors.password ? "#D19701" : "#EFE7C8"}
                  focusColor="#D19701"
                  className="bg-transparent"
                  labelClassName="text-[#111111] font-medium"
                  inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                />
                {errors.password && (
                  <p className="mt-2 text-sm flex items-center" style={{ color: '#B67E00' }}>
                    <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: '#D19701' }}></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded cursor-pointer focus:ring-2 focus:ring-offset-0"
                    style={{
                      color: "#D19701",
                      borderColor: "#EFE7C8",
                      backgroundColor: "#FDFBD4",
                    }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm cursor-pointer text-[#666666]"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold transition-colors"
                    style={{ color: '#D19701' }}
                    onMouseEnter={(e) => e.target.style.color = '#B67E00'}
                    onMouseLeave={(e) => e.target.style.color = '#D19701'}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button - Gold Theme */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-[14px] font-heading font-semibold text-[#5A3A00] text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  border: '1px solid #C38A00',
                  boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#5A3A00' }}></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#666666]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold transition-colors"
                  style={{ color: '#D19701' }}
                  onMouseEnter={(e) => e.target.style.color = '#B67E00'}
                  onMouseLeave={(e) => e.target.style.color = '#D19701'}
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default LoginPage;