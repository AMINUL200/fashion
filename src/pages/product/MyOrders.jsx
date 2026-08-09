import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ChevronRight,
  ChevronDown,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingBag,
  Eye,
  Calendar,
  MapPin,
  CreditCard,
  Receipt,
  Download,
  ArrowLeft,
  Search,
  Filter,
  Star,
  MessageCircle
} from 'lucide-react';

const MyOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Order Statuses
  const statusConfig = {
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

  // Sample Orders Data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.98,
      items: [
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
        }
      ],
      shippingAddress: 'Habra NRC Road, Dhanar Chatal, Jadssore Road, North 24 Parganas',
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK-2024-001-789'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 149.97,
      items: [
        {
          id: 3,
          name: 'Vintage Graphic T-Shirt',
          brand: 'Puma',
          price: 39.99,
          quantity: 3,
          size: 'XL',
          color: 'Navy',
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=250&fit=crop'
        }
      ],
      shippingAddress: 'Habra NRC Road, Dhanar Chatal, Jadssore Road, North 24 Parganas',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK-2024-002-456'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'processing',
      total: 54.99,
      items: [
        {
          id: 4,
          name: 'Performance Dry-Fit Tee',
          brand: 'Under Armour',
          price: 44.99,
          quantity: 1,
          size: 'S',
          color: 'Red',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop'
        }
      ],
      shippingAddress: 'Habra NRC Road, Dhanar Chatal, Jadssore Road, North 24 Parganas',
      paymentMethod: 'Credit Card',
      trackingNumber: null
    },
    {
      id: 'ORD-2024-004',
      date: '2024-01-01',
      status: 'cancelled',
      total: 79.98,
      items: [
        {
          id: 5,
          name: 'Classic Striped T-Shirt',
          brand: 'Nike',
          price: 32.99,
          quantity: 2,
          size: 'M',
          color: 'Blue',
          image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=200&h=250&fit=crop'
        }
      ],
      shippingAddress: 'Habra NRC Road, Dhanar Chatal, Jadssore Road, North 24 Parganas',
      paymentMethod: 'Credit Card',
      trackingNumber: null
    }
  ];

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    const statusMatch = activeTab === 'all' || order.status === activeTab;
    const searchMatch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return statusMatch && searchMatch;
  });

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <span 
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
        style={{
          color: config.color,
          backgroundColor: config.bgColor,
          border: `1px solid ${config.borderColor}`
        }}
      >
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-[14px] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300"
            >
              <ArrowLeft size={20} className="text-[#666666] hover:text-[#D19701]" />
            </button>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-[#111111]">My Orders</h1>
              <p className="text-sm text-[#666666]">Track and manage your orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999] w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-[#EFE7C8]">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'].map((status) => {
            const count = orders.filter(o => status === 'all' || o.status === status).length;
            const config = statusConfig[status];
            const isActive = activeTab === status;
            
            return (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`px-4 py-2 rounded-[14px] text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-[#5A3A00] shadow-lg'
                    : 'text-[#666666] hover:text-[#D19701]'
                }`}
                style={{
                  background: isActive 
                    ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)'
                    : '#FDFBD4',
                  border: isActive 
                    ? '1px solid #C38A00'
                    : '1px solid #EFE7C8',
                  boxShadow: isActive 
                    ? '0 8px 20px rgba(209,151,1,0.25)'
                    : 'none'
                }}
              >
                {status !== 'all' && config && <config.icon size={14} />}
                <span className="capitalize">{status === 'all' ? 'All Orders' : status}</span>
                <span className={`text-xs ${isActive ? 'text-[#5A3A00]' : 'text-[#999999]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
              <Package size={40} className="text-[#5A3A00]" />
            </div>
            <h2 className="font-heading text-2xl text-[#111111] mb-2">No Orders Found</h2>
            <p className="text-[#666666] mb-6">You haven't placed any orders yet.</p>
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
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const config = statusConfig[order.status];
              const StatusIcon = config?.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(209,151,1,0.08)] transition-all duration-300"
                >
                  {/* Order Header - Clickable */}
                  <div
                    onClick={() => toggleOrder(order.id)}
                    className="px-4 md:px-6 py-4 cursor-pointer hover:bg-[#FDFBD4]/30 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex w-10 h-10 rounded-[14px] items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                          <Package size={18} className="text-[#5A3A00]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-heading font-semibold text-[#111111] text-sm">{order.id}</span>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#666666] mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(order.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package size={12} />
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                            </span>
                            <span className="font-heading font-semibold text-[#D19701] text-sm">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-auto md:ml-0">
                        {order.trackingNumber && (
                          <span className="text-xs text-[#666666] hidden md:inline">
                            Tracking: {order.trackingNumber}
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/order/${order.id}`);
                          }}
                          className="p-2 rounded-[10px] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300"
                        >
                          <Eye size={16} className="text-[#666666] hover:text-[#D19701]" />
                        </button>
                        <ChevronDown
                          size={20}
                          className={`text-[#666666] transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Details - Expandable */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 md:px-6 pb-4 pt-2 border-t border-[#EFE7C8]">
                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-heading font-semibold text-[#111111]">Order Items</h4>
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 rounded-xl bg-[#FDFBD4] border border-[#EFE7C8]"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[#666666]">{item.brand}</p>
                              <h5 className="font-medium text-[#111111] text-sm truncate">{item.name}</h5>
                              <div className="flex items-center gap-3 text-xs text-[#666666] mt-0.5">
                                <span>Size: {item.size}</span>
                                <span>Color: {item.color}</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-heading font-semibold text-[#D19701] text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <p className="text-xs text-[#999999]">${item.price} each</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-[#FDFBD4] border border-[#EFE7C8]">
                          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
                            <MapPin size={14} className="text-[#D19701]" />
                            Shipping Address
                          </div>
                          <p className="text-sm text-[#111111]">{order.shippingAddress}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FDFBD4] border border-[#EFE7C8]">
                          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
                            <CreditCard size={14} className="text-[#D19701]" />
                            Payment Method
                          </div>
                          <p className="text-sm text-[#111111]">{order.paymentMethod}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FDFBD4] border border-[#EFE7C8]">
                          <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
                            <Receipt size={14} className="text-[#D19701]" />
                            Order Total
                          </div>
                          <p className="text-sm font-heading font-bold text-[#D19701]">${order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#EFE7C8]">
                        {order.status === 'delivered' && (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-lg"
                              style={{
                                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                                color: '#5A3A00',
                                border: '1px solid #C38A00',
                              }}
                            >
                              <Star size={14} />
                              Write a Review
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-sm font-medium border border-[#D19701] text-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300">
                              <MessageCircle size={14} />
                              Contact Support
                            </button>
                          </>
                        )}
                        {order.status === 'processing' && (
                          <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-sm font-medium border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300">
                            <XCircle size={14} />
                            Cancel Order
                          </button>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-sm font-medium border border-[#EFE7C8] text-[#666666] hover:border-[#D19701] hover:text-[#D19701] transition-all duration-300">
                          <Download size={14} />
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default MyOrders;