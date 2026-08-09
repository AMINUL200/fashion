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
  Trash2,
  ShoppingBag,
  Star,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Eye,
  AlertCircle
} from 'lucide-react';

const MyWishListPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('wishlist');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Classic White T-Shirt',
      brand: 'Nike',
      price: 29.99,
      oldPrice: 39.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      inStock: true,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Premium Black Tee',
      brand: 'Adidas',
      price: 34.99,
      oldPrice: null,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=400&fit=crop',
      inStock: true,
      addedDate: '2024-01-14'
    },
    {
      id: 3,
      name: 'Vintage Graphic T-Shirt',
      brand: 'Puma',
      price: 39.99,
      oldPrice: 49.99,
      rating: 4.3,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop',
      inStock: false,
      addedDate: '2024-01-12'
    },
    {
      id: 4,
      name: 'Performance Dry-Fit Tee',
      brand: 'Under Armour',
      price: 44.99,
      oldPrice: null,
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1556821869-7a4c6c76a1e9?w=300&h=400&fit=crop',
      inStock: true,
      addedDate: '2024-01-10'
    },
    {
      id: 5,
      name: 'Classic Striped T-Shirt',
      brand: 'Nike',
      price: 32.99,
      oldPrice: 42.99,
      rating: 4.2,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop',
      inStock: true,
      addedDate: '2024-01-08'
    },
    {
      id: 6,
      name: 'Premium Cotton Crew',
      brand: 'Adidas',
      price: 27.99,
      oldPrice: null,
      rating: 4.6,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=400&fit=crop',
      inStock: true,
      addedDate: '2024-01-05'
    },
    {
      id: 7,
      name: 'Sport Mesh T-Shirt',
      brand: 'Under Armour',
      price: 49.99,
      oldPrice: 69.99,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop',
      inStock: true,
      addedDate: '2024-01-03'
    },
    {
      id: 8,
      name: 'Heritage Logo Tee',
      brand: 'Nike',
      price: 34.99,
      oldPrice: null,
      rating: 4.4,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&h=400&fit=crop',
      inStock: false,
      addedDate: '2024-01-01'
    }
  ]);

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

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    }
  };

  const handleMoveToCart = (id) => {
    // Implement add to cart logic
    alert('Item added to cart!');
  };

  const handleViewProduct = (id) => {
    navigate(`/products-details/${id}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? 'text-[#D19701] fill-current' : 'text-[#EFE7C8]'}
      />
    ));
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
            <h1 className="font-heading text-2xl md:text-3xl text-[#111111]">My Wishlist</h1>
            <p className="text-sm text-[#666666]">{wishlistItems.length} items in your wishlist</p>
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

          {/* Content Area - Wishlist Items List View */}
          <div className="lg:col-span-3">
            {wishlistItems.length === 0 ? (
              // Empty Wishlist
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                  <Heart size={40} className="text-[#5A3A00]" />
                </div>
                <h2 className="font-heading text-2xl text-[#111111] mb-2">Your Wishlist is Empty</h2>
                <p className="text-[#666666] mb-6">Start adding items you love to your wishlist.</p>
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
              <>
                {/* Wishlist Items List */}
                <div className="space-y-3">
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden hover:shadow-[0_8px_30px_rgba(209,151,1,0.12)] transition-all duration-300 hover:border-[#D19701]"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                        {/* Image */}
                        <div className="relative w-full sm:w-28 h-32 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#FDFBD4]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-white/50 rounded-full">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[#666666] uppercase tracking-wider font-medium">
                                {item.brand}
                              </p>
                              <h4 className="font-heading font-semibold text-[#111111] text-sm mt-0.5 line-clamp-2">
                                {item.name}
                              </h4>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-1 mt-1">
                                {renderStars(item.rating)}
                                <span className="text-xs text-[#999999] ml-1">({item.reviews})</span>
                              </div>

                              {/* Price */}
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="font-heading font-bold text-[#D19701]">${item.price.toFixed(2)}</span>
                                {item.oldPrice && (
                                  <span className="text-sm text-[#999999] line-through">${item.oldPrice.toFixed(2)}</span>
                                )}
                                {item.oldPrice && (
                                  <span className="text-xs font-semibold text-[#16A34A]">
                                    {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF
                                  </span>
                                )}
                              </div>

                              {/* Added Date */}
                              <p className="text-xs text-[#999999] mt-1">
                                Added on {new Date(item.addedDate).toLocaleDateString('en-US', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                              <button
                                onClick={() => handleViewProduct(item.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[14px] text-xs font-medium transition-all duration-300 hover:shadow-lg"
                                style={{
                                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                                  color: '#5A3A00',
                                  border: '1px solid #C38A00',
                                }}
                              >
                                <Eye size={14} />
                                View
                              </button>
                              {item.inStock && (
                                <button
                                  onClick={() => handleMoveToCart(item.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[14px] text-xs font-medium bg-white text-[#111111] border border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701] transition-all duration-300"
                                >
                                  <ShoppingBag size={14} />
                                  Add to Cart
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[14px] text-xs font-medium text-[#DC2626] border border-[#EFE7C8] hover:border-[#DC2626] hover:bg-[#DC2626]/10 transition-all duration-300"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-[#EFE7C8]">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 rounded-[14px] border transition-all duration-200 flex items-center justify-center ${
                        currentPage === 1
                          ? 'border-[#EFE7C8] text-[#999999] cursor-not-allowed'
                          : 'border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701] hover:shadow-md'
                      }`}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNumber = i + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-10 h-10 rounded-[14px] text-sm font-medium transition-all duration-200 ${
                              currentPage === pageNumber
                                ? 'text-[#5A3A00] shadow-lg'
                                : 'bg-white text-[#666666] border border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701] hover:shadow-sm'
                            }`}
                            style={{
                              background: currentPage === pageNumber 
                                ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)'
                                : '#FFFFFF',
                              color: currentPage === pageNumber ? '#5A3A00' : '#666666',
                              border: currentPage === pageNumber ? '1px solid #C38A00' : '1px solid #EFE7C8'
                            }}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        (pageNumber === currentPage - 2 && currentPage > 3) ||
                        (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <span key={i} className="text-[#999999]">
                            …
                          </span>
                        );
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 rounded-[14px] border transition-all duration-200 flex items-center justify-center ${
                        currentPage === totalPages
                          ? 'border-[#EFE7C8] text-[#999999] cursor-not-allowed'
                          : 'border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701] hover:shadow-md'
                      }`}
                    >
                      <ChevronRightIcon size={18} />
                    </button>
                  </div>
                )}

                {/* Items count */}
                <div className="text-center text-xs text-[#999999] mt-4">
                  Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, wishlistItems.length)} of {wishlistItems.length} items
                </div>
              </>
            )}
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

export default MyWishListPage;