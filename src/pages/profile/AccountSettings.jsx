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
  ArrowLeft,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Key,
  Save,
  X,
  Edit,
  Camera
} from 'lucide-react';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('settings');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 7699367737',
    bio: 'Fashion enthusiast | Premium clothing lover'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletters: true,
    productAlerts: true,
    paymentAlerts: true
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    currency: 'USD',
    timezone: 'IST (UTC+5:30)',
    theme: 'light'
  });

  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

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

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferencesChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderContent = () => {
    return (
      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
          <h3 className="font-heading text-lg text-[#111111] mb-4 flex items-center gap-2">
            <User size={18} className="text-[#D19701]" />
            Profile Information
          </h3>
          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">
                  Bio
                </label>
                <input
                  type="text"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111]"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] font-medium text-[#5A3A00] transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  border: '1px solid #C38A00',
                }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#5A3A00] border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
              {saveSuccess && (
                <span className="text-sm text-[#16A34A] flex items-center gap-1">
                  <Check size={16} />
                  Saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
          <h3 className="font-heading text-lg text-[#111111] mb-4 flex items-center gap-2">
            <Lock size={18} className="text-[#D19701]" />
            Change Password
          </h3>
          <form onSubmit={handlePasswordUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111]"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#D19701] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111]"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#D19701] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#111111] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-sm text-[#111111]"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#D19701] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-[#666666] mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} />
                  Password must be at least 6 characters
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] font-medium text-[#5A3A00] transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  border: '1px solid #C38A00',
                }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#5A3A00] border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Key size={16} />
                    Update Password
                  </>
                )}
              </button>
              {saveSuccess && (
                <span className="text-sm text-[#16A34A] flex items-center gap-1">
                  <Check size={16} />
                  Password updated!
                </span>
              )}
            </div>
          </form>
        </div>

      
     

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-[#DC2626]/30 p-6 shadow-sm">
          <h3 className="font-heading text-lg text-[#DC2626] mb-2 flex items-center gap-2">
            <AlertCircle size={18} />
            Danger Zone
          </h3>
          <p className="text-sm text-[#666666] mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="px-6 py-2.5 rounded-[14px] text-sm font-medium text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-all duration-300 hover:shadow-lg">
            Delete Account
          </button>
        </div>
      </div>
    );
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
            <h1 className="font-heading text-2xl md:text-3xl text-[#111111]">Account Settings</h1>
            <p className="text-sm text-[#666666]">Manage your account preferences and security</p>
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
      `}</style>
    </div>
  );
};

export default AccountSettings;