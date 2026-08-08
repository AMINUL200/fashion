import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  ArrowLeft,
  Shield,
  Lock,
  Check,
  Mail,
  Phone,
  User,
} from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { api } from "../../utils/app";
import PageHelmet from "../../component/common/PageHelmet";
import { useApp } from "../../context/AppContext";

const RegisterPage = () => {
  const { contactData } = useApp();
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

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
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Weak", color: "#B67E00" },
      { strength: 2, label: "Fair", color: "#D19701" },
      { strength: 3, label: "Good", color: "#D19701" },
      { strength: 4, label: "Strong", color: "#B67E00" },
      { strength: 5, label: "Very Strong", color: "#5BAE3B" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Password requirements checklist
  const passwordRequirements = [
    { label: "At least 6 characters", met: formData.password.length >= 6 },
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    {
      label: "Contains lowercase letter",
      met: /[a-z]/.test(formData.password),
    },
    { label: "Contains number", met: /\d/.test(formData.password) },
    {
      label: "Contains special character",
      met: /[^A-Za-z0-9]/.test(formData.password),
    },
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        const registerData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        };

        console.log("Sending registration data:", registerData);

        const res = await api.post("/register", registerData);

        console.log("Registration response:", res.data);

        if (res.data?.status) {
          toast.success(
            res.data.message || "Registration successful! Please login.",
          );

          if (res.data.data?.token && res.data.data?.user) {
            await login(res.data.data.user, res.data.data.token);

            if (res.data.data.user.role === "admin") {
              navigate("/admin", { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          } else {
            navigate("/login", {
              state: { message: "Registration successful! Please login." },
            });
          }
        } else {
          toast.error(res.data?.message || "Registration failed");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Registration error:", error);

        if (error.response?.status === 422) {
          const validationErrors = error.response.data?.errors || {};
          const formattedErrors = {};

          Object.keys(validationErrors).forEach((key) => {
            formattedErrors[key] = validationErrors[key][0];
          });

          setErrors(formattedErrors);
          toast.error("Please check the form for errors");
        } else {
          toast.error(
            error.response?.data?.message ||
              "Registration failed. Please try again.",
          );
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <PageHelmet title="Register - APSARA" />
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
          <div className="absolute top-10 left-10 w-20 h-20 border border-[#D19701]/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-[#D19701]/10 rounded-full"></div>
          <div className="absolute top-1/2 right-20 w-10 h-10 border border-[#D19701]/10 rounded-full"></div>
          
          {/* Fashion icons */}
          <div className="absolute top-10 left-10 text-4xl opacity-10">👗</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-10">👠</div>
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

          {/* Register Card - Gold Theme */}
          <div className="rounded-2xl shadow-2xl p-8 bg-white border border-[#EFE7C8]">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-2xl shadow-lg bg-[#FDFBD4] border-2 border-[#EFE7C8]">
                  <img
                    src="/image/logo.png"
                    alt="APSARA"
                    className="h-20 w-auto object-contain"
                  />
                </div>
              </div>
              <h2 className="font-heading text-3xl font-bold" style={{ color: '#D19701' }}>
                Join APSARA
              </h2>
              <p className="text-[#666666] text-sm mt-1">
                Create your account and start exploring luxury fashion
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <CustomInput
                  label="Full Name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  borderColor={errors.name ? "#D19701" : "#EFE7C8"}
                  focusColor="#D19701"
                  icon={User}
                  className="bg-transparent"
                  labelClassName="text-[#111111] font-medium"
                  inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                />
                {errors.name && (
                  <p className="mt-2 text-sm flex items-center" style={{ color: '#B67E00' }}>
                    <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: '#D19701' }}></span>
                    {errors.name}
                  </p>
                )}
              </div>

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
                  icon={Mail}
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

              {/* Phone Field */}
              <div>
                <CustomInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  borderColor={errors.phone ? "#D19701" : "#EFE7C8"}
                  focusColor="#D19701"
                  icon={Phone}
                  className="bg-transparent"
                  labelClassName="text-[#111111] font-medium"
                  inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm flex items-center" style={{ color: '#B67E00' }}>
                    <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: '#D19701' }}></span>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  borderColor={errors.password ? "#D19701" : "#EFE7C8"}
                  focusColor="#D19701"
                  icon={Lock}
                  className="bg-transparent"
                  labelClassName="text-[#111111] font-medium"
                  inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                />

                {/* Password Strength Indicator - Gold Theme */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex-1 h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: '#FDFBD4' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${(passwordStrength.strength / 5) * 100}%`,
                            backgroundColor: passwordStrength.color || '#D19701',
                          }}
                        ></div>
                      </div>
                      <span
                        className="text-xs font-medium ml-2"
                        style={{ color: passwordStrength.color || '#D19701' }}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>

                    {/* Password Requirements */}
                    <div className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              req.met ? "bg-[#D19701]" : "bg-[#EFE7C8]"
                            }`}
                          >
                            {req.met && (
                              <Check size={10} className="text-[#5A3A00]" />
                            )}
                          </div>
                          <span
                            className="text-xs"
                            style={{
                              color: req.met ? '#5BAE3B' : '#999999',
                            }}
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-2 text-sm flex items-center" style={{ color: '#B67E00' }}>
                    <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: '#D19701' }}></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <CustomInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  borderColor={errors.confirmPassword ? "#D19701" : "#EFE7C8"}
                  focusColor="#D19701"
                  icon={Lock}
                  className="bg-transparent"
                  labelClassName="text-[#111111] font-medium"
                  inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm flex items-center" style={{ color: '#B67E00' }}>
                    <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: '#D19701' }}></span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Agreement - Gold Theme */}
              <div className="pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 rounded cursor-pointer focus:ring-2 focus:ring-offset-0"
                    style={{
                      backgroundColor: agreedToTerms ? '#D19701' : '#FFFFFF',
                      border: '1px solid #EFE7C8',
                      color: '#D19701',
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm cursor-pointer text-[#666666]"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-semibold transition-colors"
                      style={{ color: '#D19701' }}
                      onMouseEnter={(e) => e.target.style.color = '#B67E00'}
                      onMouseLeave={(e) => e.target.style.color = '#D19701'}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-semibold transition-colors"
                      style={{ color: '#D19701' }}
                      onMouseEnter={(e) => e.target.style.color = '#B67E00'}
                      onMouseLeave={(e) => e.target.style.color = '#D19701'}
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="mt-2 text-sm flex items-center" style={{ color: '#B67E00' }}>
                    <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: '#D19701' }}></span>
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button - Gold Theme */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-[14px] font-heading font-semibold text-[#5A3A00] text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-6"
                style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  border: '1px solid #C38A00',
                  boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#5A3A00' }}></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider - Gold Theme */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#EFE7C8]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#666666]">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Sign In Link - Gold Theme */}
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] font-semibold transition-all duration-300 hover:gap-4 border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4]"
                  style={{ color: '#D19701' }}
                >
                  Sign In to Existing Account
                  <ArrowLeft size={18} className="rotate-180" />
                </Link>
              </div>
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

export default RegisterPage;