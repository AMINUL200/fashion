import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Heart,
  ArrowLeft,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  CreditCard,
  X,
  ShoppingBag,
  Gift,
  Percent,
  Clock,
  CheckCircle
} from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic White T-Shirt',
      brand: 'Nike',
      price: 29.99,
      quantity: 2,
      size: 'M',
      color: 'White',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      inStock: true,
      isWishlisted: false
    },
    {
      id: 2,
      name: 'Premium Black Tee',
      brand: 'Adidas',
      price: 34.99,
      quantity: 1,
      size: 'L',
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=400&fit=crop',
      inStock: true,
      isWishlisted: false
    },
    {
      id: 3,
      name: 'Vintage Graphic T-Shirt',
      brand: 'Puma',
      price: 39.99,
      quantity: 1,
      size: 'XL',
      color: 'Navy',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop',
      inStock: false,
      isWishlisted: false
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = isCouponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const updateQuantity = (id, type) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item
      )
    );
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setIsCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/checkout');
    }, 1000);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-[14px] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300"
            >
              <ArrowLeft size={20} className="text-[#666666] hover:text-[#D19701]" />
            </button>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-[#111111]">Shopping Cart</h1>
              <p className="text-sm text-[#666666]">{totalItems} items in your cart</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm text-[#666666]">
              <span className="font-heading font-semibold text-[#D19701]">{totalItems}</span> items
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
              <ShoppingBag size={40} className="text-[#5A3A00]" />
            </div>
            <h2 className="font-heading text-2xl text-[#111111] mb-2">Your Cart is Empty</h2>
            <p className="text-[#666666] mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3 rounded-[14px] font-heading font-semibold text-[#5A3A00] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                border: '1px solid #C38A00',
                boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden shadow-sm">
                {/* Cart Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#EFE7C8]" style={{ background: 'linear-gradient(90deg, #FFFFFF, #FDFBD4)' }}>
                  <div className="col-span-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Quantity</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Total</span>
                  </div>
                </div>

                {/* Cart Items List */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-6 py-4 border-b border-[#EFE7C8] last:border-b-0 hover:bg-[#FDFBD4]/30 transition-colors duration-200"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="relative w-24 h-28 md:w-28 md:h-32 rounded-xl overflow-hidden flex-shrink-0 bg-[#FDFBD4] border border-[#EFE7C8]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#666666] uppercase tracking-wider font-medium">{item.brand}</p>
                        <h4 className="font-heading font-semibold text-[#111111] text-sm md:text-base mt-1 line-clamp-2">
                          {item.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#666666]">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Size:</span> {item.size}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Color:</span>
                            <span
                              className="inline-block w-3 h-3 rounded-full border border-[#EFE7C8]"
                              style={{ backgroundColor: item.color.toLowerCase() }}
                            />
                          </span>
                        </div>
                        {!item.inStock && (
                          <p className="text-xs text-[#D19701] mt-1 font-medium">Notify me when available</p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                      <span className="md:hidden text-xs text-[#666666]">Price:</span>
                      <span className="font-heading font-semibold text-[#D19701]">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                      <span className="md:hidden text-xs text-[#666666]">Qty:</span>
                      <div className="flex items-center border border-[#EFE7C8] rounded-[10px] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, 'decrease')}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#FDFBD4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Minus size={14} className="text-[#666666]" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#111111]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 'increase')}
                          disabled={!item.inStock}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#FDFBD4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Plus size={14} className="text-[#666666]" />
                        </button>
                      </div>
                    </div>

                    {/* Total & Actions */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                      <div className="flex items-center gap-3">
                        <span className="md:hidden text-xs text-[#666666]">Total:</span>
                        <span className="font-heading font-bold text-[#D19701]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className="p-1.5 rounded-lg hover:bg-[#FDFBD4] transition-colors"
                        >
                          <Heart
                            size={16}
                            className={item.isWishlisted ? 'fill-[#D19701] text-[#D19701]' : 'text-[#666666]'}
                          />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg hover:bg-[#FDFBD4] transition-colors"
                        >
                          <Trash2 size={16} className="text-[#666666] hover:text-[#D19701]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/shop')}
                className="mt-4 flex items-center gap-2 text-[#D19701] hover:text-[#B67E00] transition-colors font-medium"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </button>
            </div>

            {/* Order Summary - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-[#111111] mb-6 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#D19701]" />
                  Order Summary
                  <span className="ml-auto text-sm text-[#666666] font-normal">{totalItems} items</span>
                </h3>

                {/* Coupon Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      disabled={isCouponApplied}
                      className="flex-1 px-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={isCouponApplied || !couponCode}
                      className="px-4 py-2.5 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                        color: '#5A3A00',
                        border: '1px solid #C38A00',
                      }}
                    >
                      {isCouponApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                  {isCouponApplied && (
                    <p className="text-xs text-[#D19701] mt-1.5 flex items-center gap-1">
                      <CheckCircle size={12} /> Coupon applied successfully! (10% off)
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t border-[#EFE7C8]">
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
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-[#EFE7C8]">
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-semibold text-[#111111] text-lg">Total</span>
                    <span className="font-heading font-bold text-2xl text-[#D19701]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full mt-6 py-3.5 rounded-[14px] font-heading font-semibold text-[#5A3A00] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                    border: '1px solid #C38A00',
                    boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#5A3A00] border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-center gap-4 text-xs text-[#666666]">
                    <div className="flex items-center gap-1.5">
                      <Shield size={14} className="text-[#D19701]" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard size={14} className="text-[#D19701]" />
                      <span>SSL Encrypted</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#666666]">
                    <Clock size={14} className="text-[#D19701]" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 flex justify-center gap-2">
                  <span className="text-[10px] font-semibold text-[#666666] border border-[#EFE7C8] px-2 py-0.5 rounded">Visa</span>
                  <span className="text-[10px] font-semibold text-[#666666] border border-[#EFE7C8] px-2 py-0.5 rounded">MC</span>
                  <span className="text-[10px] font-semibold text-[#666666] border border-[#EFE7C8] px-2 py-0.5 rounded">Amex</span>
                  <span className="text-[10px] font-semibold text-[#666666] border border-[#EFE7C8] px-2 py-0.5 rounded">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CartPage;