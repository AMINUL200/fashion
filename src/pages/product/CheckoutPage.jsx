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
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#EFE7C8] p-8 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
            <Check size={40} className="text-[#5A3A00]" />
          </div>
          <h2 className="font-heading text-2xl text-[#111111] mb-2">Order Placed!</h2>
          <p className="text-[#666666] mb-6">Thank you for your order. We'll send you a confirmation email shortly.</p>
          <div className="bg-[#FDFBD4] rounded-xl p-4 mb-6 border border-[#EFE7C8]">
            <p className="text-sm text-[#666666]">Order Number</p>
            <p className="font-heading font-semibold text-[#D19701]">#ORD-2024-001</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full font-heading font-semibold py-3 rounded-[14px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
              color: '#5A3A00',
              border: '1px solid #C38A00',
              boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-8 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-[#666666] hover:text-[#D19701] transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Cart
          </button>
          <h1 className="font-heading text-2xl text-[#111111]">Checkout</h1>
          <div className="w-24" />
        </div>

        {/* Progress Steps - Gold Theme */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-heading font-semibold transition-all duration-300 ${
                  s === step
                    ? 'text-[#5A3A00] shadow-lg' 
                    : s < step
                    ? 'text-[#5A3A00]'
                    : 'bg-[#EFE7C8] text-[#666666]'
                }`}
                style={{
                  background: s === step 
                    ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)'
                    : s < step
                    ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)'
                    : '#EFE7C8',
                  border: s === step ? '1px solid #C38A00' : 'none',
                  boxShadow: s === step ? '0 8px 20px rgba(209,151,1,0.25)' : 'none'
                }}>
                  {s < step ? <Check size={16} className="text-[#5A3A00]" /> : s}
                </div>
                <span className={`text-sm hidden sm:inline ${
                  s === step ? 'text-[#D19701] font-heading font-semibold' : 'text-[#666666]'
                }`}>
                  {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Confirm'}
                </span>
              </div>
              {s < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  s < step ? 'bg-[#D19701]' : 'bg-[#EFE7C8]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address - Gold Theme */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                  <MapPin size={20} className="text-[#5A3A00]" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-[#111111]">Shipping Address</h2>
                  <p className="text-sm text-[#666666]">Enter your delivery details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    Apartment / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                    placeholder="Apt 4B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                    placeholder="Miami"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111]"
                  >
                    <option value="">Select State</option>
                    <option value="FL">Florida</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
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
                  className="w-4 h-4 rounded border-[#EFE7C8] text-[#D19701] focus:ring-[#D19701]"
                />
                <label className="text-sm text-[#666666]">
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Payment Method - Gold Theme */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                  <CreditCard size={20} className="text-[#5A3A00]" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-[#111111]">Payment Method</h2>
                  <p className="text-sm text-[#666666]">Choose your payment option</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center gap-4 p-4 rounded-[14px] border-2 transition-all duration-300 ${
                    paymentMethod === 'card'
                      ? 'border-[#D19701] bg-[#FDFBD4]'
                      : 'border-[#EFE7C8] hover:border-[#D19701]/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'card' ? 'border-[#D19701]' : 'border-[#EFE7C8]'
                  }`}>
                    {paymentMethod === 'card' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D19701]" />
                    )}
                  </div>
                  <CreditCard size={20} className="text-[#666666]" />
                  <span className="font-medium text-[#111111]">Credit / Debit Card</span>
                  <div className="ml-auto flex gap-1">
                    <span className="text-xs font-semibold text-[#666666] border border-[#EFE7C8] px-2 py-0.5 rounded">Visa</span>
                    <span className="text-xs font-semibold text-[#666666] border border-[#EFE7C8] px-2 py-0.5 rounded">MC</span>
                    <span className="text-xs font-semibold text-[#666666] border border-[#EFE7C8] px-2 py-0.5 rounded">Amex</span>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`w-full flex items-center gap-4 p-4 rounded-[14px] border-2 transition-all duration-300 ${
                    paymentMethod === 'paypal'
                      ? 'border-[#D19701] bg-[#FDFBD4]'
                      : 'border-[#EFE7C8] hover:border-[#D19701]/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'paypal' ? 'border-[#D19701]' : 'border-[#EFE7C8]'
                  }`}>
                    {paymentMethod === 'paypal' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D19701]" />
                    )}
                  </div>
                  <Wallet size={20} className="text-[#666666]" />
                  <span className="font-medium text-[#111111]">PayPal</span>
                  <span className="ml-auto text-xs text-[#666666]">Fast & Secure</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mt-4 p-4 bg-[#FDFBD4] rounded-[14px] border border-[#EFE7C8] text-center">
                  <p className="text-sm text-[#666666]">You will be redirected to PayPal to complete your payment</p>
                </div>
              )}
            </div>

            {/* Place Order Button - Gold Theme */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full font-heading font-semibold py-4 rounded-[14px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: isProcessing 
                  ? '#FDFBD4' 
                  : 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                color: isProcessing ? '#666666' : '#5A3A00',
                border: '1px solid #C38A00',
                boxShadow: isProcessing ? 'none' : '0 10px 25px rgba(209,151,1,0.35)',
              }}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#5A3A00] border-t-transparent" />
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

          {/* Right Column - Order Summary - Gold Theme */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm sticky top-8">
              <h3 className="font-heading font-semibold text-[#111111] flex items-center gap-2 mb-6">
                <ShoppingBag size={20} className="text-[#D19701]" />
                Order Summary
                <span className="ml-auto text-sm text-[#666666] font-normal">
                  {cartItems.length} items
                </span>
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-[#EFE7C8] last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#666666]">{item.brand}</p>
                      <h4 className="font-medium text-[#111111] text-sm truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#666666] mt-0.5">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-heading font-semibold text-[#D19701]">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#666666]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Input - Gold Theme */}
              <div className="mt-4 pt-4 border-t border-[#EFE7C8]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                    disabled={isCouponApplied}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isCouponApplied || !couponCode}
                    className="px-4 py-2.5 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                      color: '#5A3A00',
                      border: '1px solid #C38A00',
                    }}
                  >
                    {isCouponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {isCouponApplied && (
                  <p className="text-xs text-[#D19701] mt-1.5 flex items-center gap-1">
                    <Check size={12} /> Coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Order Totals - Gold Theme */}
              <div className="mt-4 space-y-2 pt-4 border-t border-[#EFE7C8]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Subtotal</span>
                  <span className="text-[#111111] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Shipping</span>
                  <span className="text-[#111111] font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Tax (8%)</span>
                  <span className="text-[#111111] font-medium">${tax.toFixed(2)}</span>
                </div>
                {isCouponApplied && (
                  <div className="flex justify-between text-sm text-[#D19701]">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-heading font-bold pt-3 border-t border-[#EFE7C8]">
                  <span className="text-[#111111]">Total</span>
                  <span className="text-[#D19701]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Checkout Badge - Gold Theme */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#666666]">
                <Lock size={14} className="text-[#D19701]" />
                <span>Secure Checkout</span>
                <span className="w-1 h-1 rounded-full bg-[#EFE7C8]" />
                <Shield size={14} className="text-[#D19701]" />
                <span>SSL Encrypted</span>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 flex justify-center gap-4">
                <div className="h-6 px-3 flex items-center justify-center border border-[#EFE7C8] rounded text-xs font-semibold text-[#666666]">Visa</div>
                <div className="h-6 px-3 flex items-center justify-center border border-[#EFE7C8] rounded text-xs font-semibold text-[#666666]">MC</div>
                <div className="h-6 px-3 flex items-center justify-center border border-[#EFE7C8] rounded text-xs font-semibold text-[#666666]">PayPal</div>
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
          background: #FDFBD4;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D19701;
          border-radius: 4px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #D19701 #FDFBD4;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;