import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Truck,
  CreditCard,
  Wallet,
  Check,
  AlertCircle,
  Edit,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  Home,
  Smartphone,
  DollarSign,
  Percent,
  Lock,
  Shield,
  Clock,
  ArrowRight,
  Gift
} from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveInfo: false,
  });

  // Cart items
  const cartItems = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      brand: 'Nike',
      price: 29.99,
      quantity: 2,
      size: 'M',
      color: 'White',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop'
    },
    {
      id: 2,
      name: 'Premium Black Tee',
      brand: 'Adidas',
      price: 34.99,
      quantity: 1,
      size: 'L',
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=250&fit=crop'
    },
    {
      id: 3,
      name: 'Vintage Graphic T-Shirt',
      brand: 'Puma',
      price: 39.99,
      quantity: 1,
      size: 'XL',
      color: 'Navy',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=250&fit=crop'
    },
  ];

  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discountAmount = isCouponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discountAmount;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setIsCouponApplied(true);
      setDiscount(subtotal * 0.1);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  const handleQuantityChange = (itemId, type) => {
    // In real app, update cart quantity
  };

  const removeItem = (itemId) => {
    // In real app, remove item from cart
  };

  // Order Complete Screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5E7EB] p-8 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-6">
            <Check size={40} className="text-[#16A34A]" />
          </div>
          <h2 className="font-heading text-2xl text-[#111827] mb-2">Order Placed!</h2>
          <p className="text-[#6B7280] mb-6">Thank you for your order. We'll send you a confirmation email shortly.</p>
          <div className="bg-[#F8FAFC] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#6B7280]">Order Number</p>
            <p className="font-semibold text-[#111827]">#ORD-2024-001</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#182E72] text-white font-semibold py-3 rounded-xl hover:bg-[#2848A0] transition-all duration-300 hover:shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-8 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#182E72] transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Cart
          </button>
          <h1 className="font-heading text-2xl text-[#111827]">Checkout</h1>
          <div className="w-24" />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  s === step
                    ? 'bg-[#182E72] text-white shadow-lg shadow-[#182E72]/25'
                    : s < step
                    ? 'bg-[#16A34A] text-white'
                    : 'bg-[#E5E7EB] text-[#6B7280]'
                }`}>
                  {s < step ? <Check size={16} /> : s}
                </div>
                <span className={`text-sm hidden sm:inline ${
                  s === step ? 'text-[#182E72] font-semibold' : 'text-[#6B7280]'
                }`}>
                  {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Confirm'}
                </span>
              </div>
              {s < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  s < step ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E9EEFF] flex items-center justify-center">
                  <MapPin size={20} className="text-[#182E72]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#111827]">Shipping Address</h2>
                  <p className="text-sm text-[#6B7280]">Enter your delivery details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Apartment / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="Apt 4B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="Miami"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                  >
                    <option value="">Select State</option>
                    <option value="FL">Florida</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                    placeholder="33101"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-[#E5E7EB] text-[#182E72] focus:ring-[#182E72]"
                />
                <label className="text-sm text-[#6B7280]">
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E9EEFF] flex items-center justify-center">
                  <CreditCard size={20} className="text-[#182E72]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#111827]">Payment Method</h2>
                  <p className="text-sm text-[#6B7280]">Choose your payment option</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === 'card'
                      ? 'border-[#182E72] bg-[#E9EEFF]/50'
                      : 'border-[#E5E7EB] hover:border-[#182E72]/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'card' ? 'border-[#182E72]' : 'border-[#E5E7EB]'
                  }`}>
                    {paymentMethod === 'card' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#182E72]" />
                    )}
                  </div>
                  <CreditCard size={20} className="text-[#6B7280]" />
                  <span className="font-medium text-[#111827]">Credit / Debit Card</span>
                  <div className="ml-auto flex gap-1">
                    <span className="text-xs font-semibold text-[#6B7280] border border-[#E5E7EB] px-2 py-0.5 rounded">Visa</span>
                    <span className="text-xs font-semibold text-[#6B7280] border border-[#E5E7EB] px-2 py-0.5 rounded">MC</span>
                    <span className="text-xs font-semibold text-[#6B7280] border border-[#E5E7EB] px-2 py-0.5 rounded">Amex</span>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === 'paypal'
                      ? 'border-[#182E72] bg-[#E9EEFF]/50'
                      : 'border-[#E5E7EB] hover:border-[#182E72]/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'paypal' ? 'border-[#182E72]' : 'border-[#E5E7EB]'
                  }`}>
                    {paymentMethod === 'paypal' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#182E72]" />
                    )}
                  </div>
                  <Wallet size={20} className="text-[#6B7280]" />
                  <span className="font-medium text-[#111827]">PayPal</span>
                  <span className="ml-auto text-xs text-[#6B7280]">Fast & Secure</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mt-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] text-center">
                  <p className="text-sm text-[#6B7280]">You will be redirected to PayPal to complete your payment</p>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-[#182E72] text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:bg-[#2848A0] hover:shadow-lg hover:shadow-[#182E72]/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  Place Order
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm sticky top-8">
              <h3 className="font-semibold text-[#111827] flex items-center gap-2 mb-6">
                <ShoppingBag size={20} className="text-[#182E72]" />
                Order Summary
                <span className="ml-auto text-sm text-[#6B7280] font-normal">
                  {cartItems.length} items
                </span>
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-[#F1F5F9] last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#6B7280]">{item.brand}</p>
                      <h4 className="font-medium text-[#111827] text-sm truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-0.5">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-semibold text-[#182E72]">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#6B7280]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Input */}
              <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none text-sm"
                    disabled={isCouponApplied}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isCouponApplied || !couponCode}
                    className="px-4 py-2.5 bg-[#182E72] text-white rounded-xl text-sm font-medium hover:bg-[#2848A0] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCouponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {isCouponApplied && (
                  <p className="text-xs text-[#16A34A] mt-1.5 flex items-center gap-1">
                    <Check size={12} /> Coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Order Totals */}
              <div className="mt-4 space-y-2 pt-4 border-t border-[#F1F5F9]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="text-[#111827] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Shipping</span>
                  <span className="text-[#111827] font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Tax (8%)</span>
                  <span className="text-[#111827] font-medium">${tax.toFixed(2)}</span>
                </div>
                {isCouponApplied && (
                  <div className="flex justify-between text-sm text-[#16A34A]">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#E5E7EB]">
                  <span className="text-[#111827]">Total</span>
                  <span className="text-[#182E72]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Checkout Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
                <Lock size={14} />
                <span>Secure Checkout</span>
                <span className="w-1 h-1 rounded-full bg-[#E5E7EB]" />
                <Shield size={14} />
                <span>SSL Encrypted</span>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 flex justify-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=40&h=25&fit=crop"
                  alt="Visa"
                  className="h-6 object-contain"
                />
                <img
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=40&h=25&fit=crop"
                  alt="Mastercard"
                  className="h-6 object-contain"
                />
                <img
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=40&h=25&fit=crop"
                  alt="PayPal"
                  className="h-6 object-contain"
                />
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F5F9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #182E72;
          border-radius: 4px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #182E72 #F1F5F9;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;