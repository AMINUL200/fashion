import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Key, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { toast } from "react-toastify";
import { api } from "../../utils/app";
import PageHelmet from "../../component/common/PageHelmet";

const ResetPassword = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    password_confirmation: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: Reset
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmailStep = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetStep = () => {
    const newErrors = {};
    
    if (!formData.otp) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "OTP must be 6 digits";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!validateEmailStep()) return;
    
    setIsLoading(true);
    
    try {
      const response = await api.post("/forgot-password", { email: formData.email });
      
      if (response.data?.success) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
        setStep(2);
      } else {
        toast.error(response.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validateResetStep()) return;
    
    setIsLoading(true);
    
    try {
      const response = await api.post("/reset-password", formData);
      
      if (response.data?.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data?.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await api.post("/forgot-password", { email: formData.email });
      
      if (response.data?.success) {
        toast.success("OTP resent to your email!");
      } else {
        toast.error(response.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h2 className="font-heading text-3xl font-bold mb-2" style={{ color: '#D19701' }}>
              Reset Your Password
            </h2>
            <p className="mb-6 text-[#666666]">
              Enter your email address to receive a verification code
            </p>
            
            <div>
              <CustomInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                borderColor={errors.email ? '#D19701' : '#EFE7C8'}
                focusColor="#D19701"
                className="bg-transparent"
                labelClassName="text-[#111111] font-medium"
                inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
              />
              {errors.email && (
                <p className="mt-2 text-sm" style={{ color: '#B67E00' }}>{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-[14px] font-heading font-semibold text-[#5A3A00] text-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                border: '1px solid #C38A00',
                boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
              }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#5A3A00' }}></div>
                  Sending OTP...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  Send Verification Code
                </>
              )}
            </button>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="font-heading text-3xl font-bold mb-2" style={{ color: '#D19701' }}>
              Reset Password
            </h2>
            <p className="mb-6 text-[#666666]">
              Enter the OTP sent to <span style={{ color: '#D19701' }}>{formData.email}</span> and your new password
            </p>
            
            <div className="space-y-6">
              {/* OTP */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#111111]">6-Digit OTP</label>
                  <button
                    type="button"
                    onClick={resendOTP}
                    disabled={isLoading}
                    className="text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50"
                    style={{ color: '#D19701' }}
                  >
                    Resend OTP
                  </button>
                </div>
                <CustomInput
                  name="otp"
                  type="text"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  borderColor={errors.otp ? '#D19701' : '#EFE7C8'}
                  focusColor="#D19701"
                  className="bg-transparent"
                  inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                />
                {errors.otp && (
                  <p className="mt-2 text-sm" style={{ color: '#B67E00' }}>{errors.otp}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <div className="relative">
                  <CustomInput
                    label="New Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    borderColor={errors.password ? '#D19701' : '#EFE7C8'}
                    focusColor="#D19701"
                    className="bg-transparent"
                    labelClassName="text-[#111111] font-medium"
                    inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                    style={{ color: '#999999' }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm" style={{ color: '#B67E00' }}>{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <CustomInput
                    label="Confirm Password"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    borderColor={errors.password_confirmation ? '#D19701' : '#EFE7C8'}
                    focusColor="#D19701"
                    className="bg-transparent"
                    labelClassName="text-[#111111] font-medium"
                    inputClassName="bg-[#FDFBD4] border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 rounded-[14px] text-[#111111] placeholder:text-[#999999]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                    style={{ color: '#999999' }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="mt-2 text-sm" style={{ color: '#B67E00' }}>{errors.password_confirmation}</p>
                )}
              </div>

              <div className="text-sm">
                <p className="flex items-center gap-2 mb-1" style={{ color: '#666666' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#5BAE3B' }} />
                  Password must be at least 6 characters
                </p>
                <p className="flex items-center gap-2" style={{ color: '#666666' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#5BAE3B' }} />
                  Both passwords must match
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 rounded-[14px] font-semibold transition-all duration-300 active:scale-[0.98] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4]"
                style={{ color: '#D19701' }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex justify-center items-center gap-2 py-3 rounded-[14px] font-heading font-semibold text-[#5A3A00] text-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  border: '1px solid #C38A00',
                  boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#5A3A00' }}></div>
                    Resetting...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Reset Password
                  </>
                )}
              </button>
            </div>
          </>
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    switch(step) {
      case 1:
        handleSendOTP(e);
        break;
      case 2:
        handleResetPassword(e);
        break;
    }
  };

  // Progress steps
  const steps = [
    { number: 1, label: "Email" },
    { number: 2, label: "Reset" }
  ];

  return (
    <>
      <PageHelmet title="Reset Password - APSARA" />
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
          <div className="absolute top-10 right-20 w-16 h-16 border border-[#D19701]/10 rounded-full"></div>
          <div className="absolute bottom-10 left-20 w-24 h-24 border border-[#D19701]/10 rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-8 h-8 border border-[#D19701]/10 rounded-full"></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Back button - Gold Theme */}
          <button
            onClick={() => navigate("/login")}
            className="mb-6 flex items-center space-x-2 transition-colors group text-[#666666] hover:text-[#D19701]"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Login</span>
          </button>

          {/* Reset Password Card - Gold Theme */}
          <div className="rounded-2xl shadow-2xl p-8 bg-white border border-[#EFE7C8]">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-2xl shadow-lg bg-[#FDFBD4] border-2 border-[#EFE7C8]">
                <img
                  src="/image/logo.png"
                  alt="APSARA"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* Progress Steps - Gold Theme */}
            <div className="flex justify-between items-center mb-8">
              {steps.map((stepItem, index) => (
                <React.Fragment key={stepItem.number}>
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-heading font-semibold
                        ${step >= stepItem.number 
                          ? 'text-[#5A3A00]' 
                          : 'text-[#999999]'
                        }`}
                      style={{
                        backgroundColor: step >= stepItem.number ? 'transparent' : 'transparent',
                        borderColor: step >= stepItem.number ? '#D19701' : '#EFE7C8',
                        background: step > stepItem.number ? 'linear-gradient(90deg, #B67E00, #D19701)' : 'transparent',
                      }}
                    >
                      {step > stepItem.number ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span style={{ color: step >= stepItem.number ? '#D19701' : '#999999' }}>
                          {stepItem.number}
                        </span>
                      )}
                    </div>
                    <span 
                      className={`text-xs mt-2 font-medium`}
                      style={{ 
                        color: step >= stepItem.number ? '#D19701' : '#999999'
                      }}
                    >
                      {stepItem.label}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div 
                      className="flex-1 h-1 mx-2 rounded-full"
                      style={{ 
                        backgroundColor: step > stepItem.number ? '#D19701' : '#EFE7C8'
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}
            </form>

            {/* Security Note - Gold Theme */}
            <div className="mt-6 p-3 rounded-[14px] flex items-start gap-2 border border-[#D19701]/30" style={{ background: '#FDFBD4' }}>
              <CheckCircle size={16} className="text-[#D19701] mt-0.5 flex-shrink-0" />
              <p className="text-xs" style={{ color: '#5A3A00' }}>
                Your password reset process is secure and encrypted.
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

export default ResetPassword;