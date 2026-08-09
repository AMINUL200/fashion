import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
  Receipt,
  Download,
  Printer,
  Star,
  MessageCircle,
  ShoppingBag,
  Calendar,
  User,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Check,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [activeTab, setActiveTab] = useState('items');
  const [showTrackModal, setShowTrackModal] = useState(false);

  // Sample Order Data
  const order = {
    id: orderId || 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 89.98,
    subtotal: 79.99,
    shippingCost: 9.99,
    tax: 6.40,
    discount: 6.40,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    shippingAddress: {
      name: 'John Doe',
      address: 'Habra NRC Road, Dhanar Chatal',
      city: 'Jadssore Road',
      state: 'North 24 Parganas',
      pincode: '743263',
      phone: '+91 7699367737',
      email: 'john@example.com'
    },
    billingAddress: {
      name: 'John Doe',
      address: 'Habra NRC Road, Dhanar Chatal',
      city: 'Jadssore Road',
      state: 'North 24 Parganas',
      pincode: '743263'
    },
    trackingNumber: 'TRK-2024-001-789',
    carrier: 'DHL Express',
    estimatedDelivery: '2024-01-18',
    items: [
      {
        id: 1,
        name: 'Classic White T-Shirt',
        brand: 'Nike',
        price: 29.99,
        quantity: 2,
        size: 'M',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop',
        subtotal: 59.98,
        discount: 0
      },
      {
        id: 2,
        name: 'Premium Black Tee',
        brand: 'Adidas',
        price: 34.99,
        quantity: 1,
        size: 'L',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=250&fit=crop',
        subtotal: 34.99,
        discount: 0
      }
    ],
    timeline: [
      { status: 'Order Placed', date: '2024-01-15 10:30 AM', icon: Package, completed: true },
      { status: 'Payment Confirmed', date: '2024-01-15 10:35 AM', icon: CreditCard, completed: true },
      { status: 'Processing', date: '2024-01-15 02:00 PM', icon: Clock, completed: true },
      { status: 'Shipped', date: '2024-01-16 09:00 AM', icon: Truck, completed: true },
      { status: 'Out for Delivery', date: '2024-01-17 08:00 AM', icon: Truck, completed: true },
      { status: 'Delivered', date: '2024-01-17 03:30 PM', icon: CheckCircle, completed: true }
    ]
  };

  // Tracking Steps
  const trackingSteps = [
    { status: 'Order Placed', date: 'Jan 15, 10:30 AM', location: 'Online', completed: true },
    { status: 'Processing', date: 'Jan 15, 2:00 PM', location: 'Warehouse', completed: true },
    { status: 'Shipped', date: 'Jan 16, 9:00 AM', location: 'DHL Facility, Kolkata', completed: true },
    { status: 'Out for Delivery', date: 'Jan 17, 8:00 AM', location: 'Habra Delivery Center', completed: true },
    { status: 'Delivered', date: 'Jan 17, 3:30 PM', location: 'Dhanar Chatal, Habra', completed: true }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      delivered: { 
        label: 'Delivered', 
        icon: CheckCircle, 
        color: '#16A34A',
        bgColor: '#16A34A/10',
        borderColor: '#16A34A/30'
      },
      shipped: { 
        label: 'Shipped', 
        icon: Truck, 
        color: '#D19701',
        bgColor: '#D19701/10',
        borderColor: '#D19701/30'
      },
      processing: { 
        label: 'Processing', 
        icon: Clock, 
        color: '#F59E0B',
        bgColor: '#F59E0B/10',
        borderColor: '#F59E0B/30'
      },
      cancelled: { 
        label: 'Cancelled', 
        icon: XCircle, 
        color: '#DC2626',
        bgColor: '#DC2626/10',
        borderColor: '#DC2626/30'
      },
      returned: { 
        label: 'Returned', 
        icon: XCircle, 
        color: '#6B7280',
        bgColor: '#6B7280/10',
        borderColor: '#6B7280/30'
      }
    };
    return configs[status] || configs.processing;
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleDownloadInvoice = () => {
    // Implement invoice download logic
    console.log('Downloading invoice...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="p-2 rounded-[14px] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300"
            >
              <ArrowLeft size={20} className="text-[#666666] hover:text-[#D19701]" />
            </button>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-[#111111]">Order Details</h1>
              <p className="text-sm text-[#666666]">View and manage your order information</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-[14px] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300"
            >
              <Printer size={18} className="text-[#666666] hover:text-[#D19701]" />
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="p-2 rounded-[14px] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300"
            >
              <Download size={18} className="text-[#666666] hover:text-[#D19701]" />
            </button>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                <Package size={22} className="text-[#5A3A00]" />
              </div>
              <div>
                <h2 className="font-heading text-lg text-[#111111]">{order.id}</h2>
                <div className="flex items-center gap-3 text-sm text-[#666666]">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(order.date)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Package size={14} />
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  color: statusConfig.color,
                  backgroundColor: statusConfig.bgColor,
                  border: `1px solid ${statusConfig.borderColor}`
                }}
              >
                <StatusIcon size={14} />
                {statusConfig.label}
              </span>
              <span className="font-heading text-2xl font-bold text-[#D19701]">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
              <h3 className="font-heading text-lg text-[#111111] mb-4 flex items-center gap-2">
                <Clock size={18} className="text-[#D19701]" />
                Order Timeline
              </h3>
              <div className="relative">
                {order.timeline.map((item, index) => {
                  const Icon = item.icon;
                  const isLast = index === order.timeline.length - 1;
                  return (
                    <div key={index} className="flex gap-4 pb-6 last:pb-0 relative">
                      {/* Vertical line */}
                      {!isLast && (
                        <div 
                          className="absolute left-5 top-10 w-0.5 h-[calc(100%-20px)]"
                          style={{ 
                            background: item.completed 
                              ? 'linear-gradient(180deg, #D19701, #EFE7C8)'
                              : '#EFE7C8'
                          }}
                        />
                      )}
                      {/* Icon */}
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.completed ? 'text-[#5A3A00]' : 'text-[#666666]'
                        }`}
                        style={{
                          background: item.completed 
                            ? 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)'
                            : '#FDFBD4',
                          border: item.completed ? '1px solid #C38A00' : '1px solid #EFE7C8'
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${
                            item.completed ? 'text-[#111111]' : 'text-[#666666]'
                          }`}>
                            {item.status}
                          </span>
                          <span className="text-xs text-[#999999]">{item.date}</span>
                        </div>
                        {item.completed && (
                          <p className="text-xs text-[#D19701] mt-0.5 flex items-center gap-1">
                            <Check size={12} />
                            Completed
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
              <h3 className="font-heading text-lg text-[#111111] mb-4 flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#D19701]" />
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl bg-[#FDFBD4] border border-[#EFE7C8] hover:border-[#D19701]/50 transition-all duration-300"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#666666] uppercase tracking-wider font-medium">{item.brand}</p>
                      <h5 className="font-heading font-semibold text-[#111111] text-sm">{item.name}</h5>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666] mt-1">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-heading font-semibold text-[#D19701] text-sm">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <span className="text-xs text-[#999999] line-through">
                          {formatCurrency((item.price * item.quantity) * 1.2)}
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-xs font-medium border border-[#D19701] text-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300">
                      <Eye size={14} />
                      View Product
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {order.status === 'delivered' && (
                <>
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                      color: '#5A3A00',
                      border: '1px solid #C38A00',
                    }}
                  >
                    <Star size={16} />
                    Write a Review
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-medium border border-[#D19701] text-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300">
                    <MessageCircle size={16} />
                    Contact Support
                  </button>
                </>
              )}
              {order.status === 'processing' && (
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-medium border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300">
                  <XCircle size={16} />
                  Cancel Order
                </button>
              )}
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-medium border border-[#EFE7C8] text-[#666666] hover:border-[#D19701] hover:text-[#D19701] transition-all duration-300">
                <Heart size={16} />
                Buy Again
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-medium border border-[#EFE7C8] text-[#666666] hover:border-[#D19701] hover:text-[#D19701] transition-all duration-300">
                <Share2 size={16} />
                Share Order
              </button>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
              <h3 className="font-heading text-lg text-[#111111] mb-4 flex items-center gap-2">
                <Truck size={18} className="text-[#D19701]" />
                Shipping Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User size={16} className="text-[#D19701] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#111111]">{order.shippingAddress.name}</p>
                    <p className="text-xs text-[#666666]">{order.shippingAddress.address}</p>
                    <p className="text-xs text-[#666666]">
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </p>
                    <p className="text-xs text-[#666666]">Pin: {order.shippingAddress.pincode}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-[#D19701] mt-0.5" />
                  <p className="text-sm text-[#111111]">{order.shippingAddress.phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#D19701] mt-0.5" />
                  <p className="text-sm text-[#111111]">{order.shippingAddress.email}</p>
                </div>
              </div>
              {order.trackingNumber && (
                <div className="mt-4 pt-4 border-t border-[#EFE7C8]">
                  <p className="text-xs text-[#666666]">Tracking Number</p>
                  <p className="text-sm font-medium text-[#111111]">{order.trackingNumber}</p>
                  <p className="text-xs text-[#D19701] mt-1">Carrier: {order.carrier}</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
              <h3 className="font-heading text-lg text-[#111111] mb-4 flex items-center gap-2">
                <Receipt size={18} className="text-[#D19701]" />
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Subtotal</span>
                  <span className="text-[#111111]">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Shipping</span>
                  <span className="text-[#111111]">{formatCurrency(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Tax</span>
                  <span className="text-[#111111]">{formatCurrency(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-[#D19701]">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="pt-3 mt-3 border-t border-[#EFE7C8]">
                  <div className="flex justify-between">
                    <span className="font-heading font-semibold text-[#111111]">Total</span>
                    <span className="font-heading font-bold text-xl text-[#D19701]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#EFE7C8]">
                <p className="text-xs text-[#666666]">Payment Method</p>
                <p className="text-sm font-medium text-[#111111]">{order.paymentMethod}</p>
                <p className="text-xs text-[#16A34A] mt-1 flex items-center gap-1">
                  <Check size={12} />
                  {order.paymentStatus}
                </p>
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

        @media print {
          .bg-white {
            background: white !important;
            border: 1px solid #ddd !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderDetails;