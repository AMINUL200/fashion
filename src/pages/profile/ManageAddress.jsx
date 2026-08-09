import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Settings,
  MapPin,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  Edit,
  Trash2,
  Plus,
  X,
  Check,
  Home,
  Briefcase,
  Mail,
  Phone,
  User as UserIcon,
  ArrowLeft,
  MoreVertical,
  AlertCircle
} from 'lucide-react';

const ManageAddress = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState('address');
  
  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  // Sample addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: 'Habra NRC Road, Dhanar Chatal, Jadssore Road',
      city: 'North 24 Parganas',
      state: 'West Bengal',
      pincode: '743263',
      phone: '+91 7699367737',
      email: 'john@example.com',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      address: 'Kolkata City Centre, Sector V',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
      phone: '+91 7980971636',
      email: 'john.work@example.com',
      isDefault: false
    },
    {
      id: 3,
      type: 'Other',
      name: 'John Doe',
      address: 'Salt Lake City, Sector 1',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700064',
      phone: '+91 9876543210',
      email: 'john.other@example.com',
      isDefault: false
    }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    isDefault: false
  });

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

  const handleAddAddress = () => {
    setShowAddForm(true);
    setShowEditForm(false);
    setFormData({
      type: 'Home',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      isDefault: false
    });
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type,
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
      email: address.email,
      isDefault: address.isDefault
    });
    setShowEditForm(true);
    setShowAddForm(false);
    setActiveDropdown(null);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      setActiveDropdown(null);
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    setActiveDropdown(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showAddForm) {
      const newAddress = {
        id: Date.now(),
        ...formData
      };
      setAddresses([...addresses, newAddress]);
      setShowAddForm(false);
    } else if (showEditForm && editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...addr, ...formData } : addr
      ));
      setShowEditForm(false);
      setEditingAddress(null);
    }
    setFormData({
      type: 'Home',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      isDefault: false
    });
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setEditingAddress(null);
    setFormData({
      type: 'Home',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      isDefault: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Home': return <Home size={16} className="text-[#D19701]" />;
      case 'Work': return <Briefcase size={16} className="text-[#D19701]" />;
      default: return <MapPin size={16} className="text-[#D19701]" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Home': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Work': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
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
            <h1 className="font-heading text-2xl md:text-3xl text-[#111111]">Manage Addresses</h1>
            <p className="text-sm text-[#666666]">Add, edit or remove your saved addresses</p>
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
            {/* Add New Address Button */}
            {!showAddForm && !showEditForm && (
              <div className="mb-6">
                <button
                  onClick={handleAddAddress}
                  className="flex items-center gap-2 px-6 py-3 rounded-[14px] font-heading font-semibold text-[#5A3A00] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                    border: '1px solid #C38A00',
                    boxShadow: '0 8px 20px rgba(209,151,1,0.25)',
                  }}
                >
                  <Plus size={18} />
                  Add New Address
                </button>
              </div>
            )}

            {/* Add/Edit Form */}
            {(showAddForm || showEditForm) && (
              <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-lg text-[#111111]">
                    {showAddForm ? 'Add New Address' : 'Edit Address'}
                  </h3>
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-lg hover:bg-[#FDFBD4] transition-colors"
                  >
                    <X size={18} className="text-[#666666]" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Address Type */}
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Address Type <span className="text-[#D19701]">*</span>
                      </label>
                      <div className="flex gap-3">
                        {['Home', 'Work', 'Other'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type }))}
                            className={`px-4 py-2 rounded-[10px] text-sm font-medium border transition-all duration-200 ${
                              formData.type === type
                                ? 'border-[#D19701] bg-[#FDFBD4] text-[#5A3A00]'
                                : 'border-[#EFE7C8] text-[#666666] hover:border-[#D19701]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Full Name <span className="text-[#D19701]">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                          placeholder="Enter full name"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Address <span className="text-[#D19701]">*</span>
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-3 text-[#999999]" />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows="2"
                          className="w-full pl-10 pr-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999] resize-none"
                          placeholder="Enter street address"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        City <span className="text-[#D19701]">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                        placeholder="Enter city"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        State <span className="text-[#D19701]">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                        placeholder="Enter state"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Pincode <span className="text-[#D19701]">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                        placeholder="Enter pincode"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Phone Number <span className="text-[#D19701]">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111] placeholder:text-[#999999]"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Default Address */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-[#EFE7C8] text-[#D19701] focus:ring-[#D19701]"
                    />
                    <label className="text-sm text-[#666666]">
                      Set as default address
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4 border-t border-[#EFE7C8]">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-[14px] font-medium text-[#5A3A00] transition-all duration-300 hover:shadow-lg"
                      style={{
                        background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                        border: '1px solid #C38A00',
                      }}
                    >
                      {showAddForm ? 'Save Address' : 'Update Address'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2.5 rounded-[14px] font-medium border border-[#EFE7C8] text-[#666666] hover:border-[#D19701] hover:text-[#D19701] transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Addresses List */}
            {!showAddForm && !showEditForm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-white rounded-2xl border border-[#EFE7C8] p-6 hover:shadow-md transition-shadow relative"
                  >
                    {/* Address Type Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(address.type)}
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getTypeColor(address.type)}`}>
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="text-xs text-[#D19701] bg-[#FDFBD4] px-2 py-0.5 rounded-full border border-[#D19701]/30">
                            Default
                          </span>
                        )}
                      </div>
                      {/* Three Dot Menu */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === address.id ? null : address.id)}
                          className="p-1.5 rounded-lg hover:bg-[#FDFBD4] transition-colors"
                        >
                          <MoreVertical size={18} className="text-[#666666]" />
                        </button>
                        {activeDropdown === address.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-[14px] border border-[#EFE7C8] shadow-lg py-1 z-10">
                            <button
                              onClick={() => handleEditAddress(address)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#666666] hover:bg-[#FDFBD4] transition-colors"
                            >
                              <Edit size={14} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleSetDefault(address.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#666666] hover:bg-[#FDFBD4] transition-colors"
                            >
                              <Check size={14} />
                              Set as Default
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FDFBD4] transition-colors"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-1">
                      <p className="font-medium text-[#111111]">{address.name}</p>
                      <p className="text-sm text-[#666666]">{address.address}</p>
                      <p className="text-sm text-[#666666]">{address.city}, {address.state}</p>
                      <p className="text-sm text-[#666666]">Pin: {address.pincode}</p>
                      <p className="text-sm text-[#666666]">Phone: {address.phone}</p>
                      {address.email && (
                        <p className="text-sm text-[#666666]">Email: {address.email}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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

export default ManageAddress;