import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Settings,
  MapPin,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  Edit,
  Camera,
  Mail,
  Phone,
  Calendar,
  Shield,
  CreditCard,
  Bell,
  HelpCircle,
  ArrowLeft,
  CheckCircle,
  Star,
  Truck,
  Clock
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('profile');

  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 7699367737',
    joinedDate: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  // Sample address data
  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: 'Habra NRC Road, Dhanar Chatal, Jadssore Road',
      city: 'North 24 Parganas',
      state: 'West Bengal',
      pincode: '743263',
      phone: '+91 7699367737',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      address: 'Kolkata City Centre, Sector V',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
      phone: '+91 7980971636',
      isDefault: false
    }
  ];

  // Sample wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      brand: 'Nike',
      price: 29.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop',
      inStock: true
    },
    {
      id: 2,
      name: 'Premium Black Tee',
      brand: 'Adidas',
      price: 34.99,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=250&fit=crop',
      inStock: true
    },
    {
      id: 3,
      name: 'Vintage Graphic T-Shirt',
      brand: 'Puma',
      price: 39.99,
      rating: 4.3,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=250&fit=crop',
      inStock: false
    }
  ];

  // Navigation links
  const navLinks = [
    { id: 'profile', label: 'Profile Information', icon: User, path: '/profile' },
    { id: 'address', label: 'Manage Addresses', icon: MapPin, path: '/profile/addresses' },
    { id: 'orders', label: 'My Orders', icon: Package, path: '/orders' },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart, path: '/profile/wishlist' },
    { id: 'settings', label: 'Account Settings', icon: Settings, path: '/profile/settings' },
  ];

  const handleNavClick = (sectionId, path) => {
    setActiveSection(sectionId);
    navigate(path);
  };

  // Render content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="flex items-start gap-6 p-6 bg-[#FDFBD4] rounded-2xl border border-[#EFE7C8]">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#D19701]"
                />
                <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#D19701] text-white hover:bg-[#B67E00] transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-xl text-[#111111]">{userData.name}</h2>
                <p className="text-sm text-[#666666] flex items-center gap-2 mt-1">
                  <Mail size={14} />
                  {userData.email}
                </p>
                <p className="text-sm text-[#666666] flex items-center gap-2">
                  <Phone size={14} />
                  {userData.phone}
                </p>
                <p className="text-xs text-[#999999] flex items-center gap-2 mt-1">
                  <Calendar size={12} />
                  Joined {userData.joinedDate}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-sm font-medium border border-[#D19701] text-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300">
                <Edit size={14} />
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-[#EFE7C8] text-center hover:shadow-md transition-shadow">
                <Package size={24} className="text-[#D19701] mx-auto mb-2" />
                <p className="text-2xl font-heading font-bold text-[#111111]">12</p>
                <p className="text-sm text-[#666666]">Total Orders</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#EFE7C8] text-center hover:shadow-md transition-shadow">
                <Heart size={24} className="text-[#D19701] mx-auto mb-2" />
                <p className="text-2xl font-heading font-bold text-[#111111]">{wishlistItems.length}</p>
                <p className="text-sm text-[#666666]">Wishlist Items</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#EFE7C8] text-center hover:shadow-md transition-shadow">
                <Star size={24} className="text-[#D19701] mx-auto mb-2" />
                <p className="text-2xl font-heading font-bold text-[#111111]">4.8</p>
                <p className="text-sm text-[#666666]">Average Rating</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6">
              <h3 className="font-heading text-lg text-[#111111] mb-4 flex items-center gap-2">
                <Clock size={18} className="text-[#D19701]" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#FDFBD4] rounded-xl border border-[#EFE7C8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D19701]/10 flex items-center justify-center">
                      <Package size={16} className="text-[#D19701]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#111111]">Order #ORD-2024-001</p>
                      <p className="text-xs text-[#666666]">Delivered on Jan 17, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#16A34A] flex items-center gap-1">
                    <CheckCircle size={12} />
                    Completed
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FDFBD4] rounded-xl border border-[#EFE7C8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D19701]/10 flex items-center justify-center">
                      <Heart size={16} className="text-[#D19701]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#111111]">Added to Wishlist</p>
                      <p className="text-xs text-[#666666]">Classic White T-Shirt</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#D19701]">Today</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'address':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl text-[#111111]">Manage Addresses</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  color: '#5A3A00',
                  border: '1px solid #C38A00',
                }}
              >
                <MapPin size={14} />
                Add New Address
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div key={address.id} className="bg-white rounded-2xl border border-[#EFE7C8] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-heading font-semibold text-[#111111]">{address.type}</h4>
                      {address.isDefault && (
                        <span className="text-xs text-[#D19701] bg-[#FDFBD4] px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-[#FDFBD4] transition-colors">
                        <Edit size={14} className="text-[#666666] hover:text-[#D19701]" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#666666]">{address.address}</p>
                  <p className="text-sm text-[#666666]">{address.city}, {address.state}</p>
                  <p className="text-sm text-[#666666]">Pin: {address.pincode}</p>
                  <p className="text-sm text-[#666666]">Phone: {address.phone}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-[#111111]">My Orders</h2>
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 text-center">
              <Package size={48} className="text-[#D19701] mx-auto mb-4" />
              <p className="text-[#666666]">View all your orders</p>
              <button
                onClick={() => navigate('/orders')}
                className="mt-4 px-6 py-2 rounded-[14px] font-medium text-[#5A3A00] transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  border: '1px solid #C38A00',
                }}
              >
                Go to Orders
              </button>
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-[#111111]">My Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#FDFBD4]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-[#D19701] hover:text-white transition-colors">
                      <Heart size={16} className="fill-[#D19701] text-[#D19701]" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-[#666666] uppercase tracking-wider">{item.brand}</p>
                    <h4 className="font-medium text-[#111111] text-sm mt-1 line-clamp-2">{item.name}</h4>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star size={12} className="text-[#D19701] fill-[#D19701]" />
                      <span className="text-xs text-[#666666]">{item.rating}</span>
                      <span className="text-xs text-[#999999]">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-heading font-bold text-[#D19701]">${item.price}</span>
                    </div>
                    <button className="w-full mt-3 py-2 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-lg"
                      style={{
                        background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                        color: '#5A3A00',
                        border: '1px solid #C38A00',
                      }}
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-[#111111]">Account Settings</h2>
            <div className="bg-white rounded-2xl border border-[#EFE7C8] divide-y divide-[#EFE7C8]">
              <div className="p-4 flex items-center justify-between hover:bg-[#FDFBD4]/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-[#D19701]" />
                  <span className="text-[#111111]">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-[#999999]" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-[#FDFBD4]/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-[#D19701]" />
                  <span className="text-[#111111]">Notification Preferences</span>
                </div>
                <ChevronRight size={16} className="text-[#999999]" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-[#FDFBD4]/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard size={18} className="text-[#D19701]" />
                  <span className="text-[#111111]">Payment Methods</span>
                </div>
                <ChevronRight size={16} className="text-[#999999]" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-[#FDFBD4]/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-[#D19701]" />
                  <span className="text-[#111111]">Help & Support</span>
                </div>
                <ChevronRight size={16} className="text-[#999999]" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-[#FDFBD4]/30 transition-colors cursor-pointer text-[#DC2626]">
                <div className="flex items-center gap-3">
                  <LogOut size={18} />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-[14px] border border-[#EFE7C8] hover:border-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300"
          >
            <ArrowLeft size={20} className="text-[#666666] hover:text-[#D19701]" />
          </button>
          <div>
            <h1 className="font-heading text-2xl md:text-3xl text-[#111111]">My Account</h1>
            <p className="text-sm text-[#666666]">Manage your profile, orders and preferences</p>
          </div>
        </div>

        {/* Main Content - Sidebar + Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-4 shadow-sm sticky top-24">
              {/* User Summary */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#EFE7C8]">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D19701]"
                />
                <div>
                  <p className="font-heading font-semibold text-[#111111] text-sm">{userData.name}</p>
                  <p className="text-xs text-[#666666]">{userData.email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id, link.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[14px] text-sm transition-all duration-300 ${
                        isActive
                          ? 'text-[#5A3A00] font-medium'
                          : 'text-[#666666] hover:text-[#D19701] hover:bg-[#FDFBD4]'
                      }`}
                      style={{
                        background: isActive 
                          ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)'
                          : 'transparent',
                        boxShadow: isActive ? '0 4px 15px rgba(209,151,1,0.15)' : 'none'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? 'text-[#5A3A00]' : ''} />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight size={16} className={isActive ? 'text-[#5A3A00]' : 'text-[#999999]'} />
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <button className="w-full mt-4 pt-4 border-t border-[#EFE7C8] flex items-center justify-center gap-2 px-3 py-2.5 rounded-[14px] text-sm text-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
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

export default ProfilePage;