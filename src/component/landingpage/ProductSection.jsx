import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Eye, 
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ProductSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);

  const tabs = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

  const products = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      brand: 'Nike',
      price: 29.99,
      oldPrice: 39.99,
      rating: 4.8,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&auto=format',
      category: 'Men',
      isNew: true,
      isSale: true,
      discount: 25
    },
    {
      id: 2,
      name: 'Premium Black Tee',
      brand: 'Adidas',
      price: 34.99,
      oldPrice: null,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop&auto=format',
      category: 'Men',
      isNew: false,
      isSale: false
    },
    {
      id: 3,
      name: 'Vintage Graphic T-Shirt',
      brand: 'Puma',
      price: 39.99,
      oldPrice: 49.99,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&auto=format',
      category: 'Men',
      isNew: true,
      isSale: true,
      discount: 20
    },
    {
      id: 4,
      name: 'Performance Dry-Fit Tee',
      brand: 'Under Armour',
      price: 44.99,
      oldPrice: null,
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1556821869-7a4c6c76a1e9?w=400&h=500&fit=crop&auto=format',
      category: 'Men',
      isNew: false,
      isSale: false
    },
    {
      id: 5,
      name: 'Classic Striped T-Shirt',
      brand: 'Nike',
      price: 32.99,
      oldPrice: 42.99,
      rating: 4.5,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&auto=format',
      category: 'Men',
      isNew: false,
      isSale: true,
      discount: 23
    },
    {
      id: 6,
      name: 'Premium Cotton Crew',
      brand: 'Adidas',
      price: 27.99,
      oldPrice: null,
      rating: 4.4,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=500&fit=crop&auto=format',
      category: 'Women',
      isNew: true,
      isSale: false
    },
    {
      id: 7,
      name: 'Essential Logo Tee',
      brand: 'Puma',
      price: 24.99,
      oldPrice: null,
      rating: 4.3,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=500&fit=crop&auto=format',
      category: 'Kids',
      isNew: false,
      isSale: false
    },
    {
      id: 8,
      name: 'Sport Mesh T-Shirt',
      brand: 'Under Armour',
      price: 49.99,
      oldPrice: 69.99,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop&auto=format',
      category: 'Women',
      isNew: false,
      isSale: true,
      discount: 29
    }
  ];

  // Filter products based on active tab
  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  // Toggle wishlist
  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? 'text-[#FDBA12] fill-current' : 'text-[#E5E7EB]'}
      />
    ));
  };

  // Update arrow enabled/disabled state based on scroll position
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  // Slide the row left/right by ~2 cards
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 24 : 300; // +gap
    el.scrollBy({ left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
  };

  // Reset scroll position whenever the category changes, and re-check arrow state
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: 'auto' });
    }
    // slight delay so scrollWidth reflects the new filtered list
    const timeout = setTimeout(updateScrollButtons, 50);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[#6B7280] text-xs uppercase tracking-[0.2em] font-medium">
            Recommended
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-[#111827] mt-2">
            Best Selling Products
          </h2>
          <p className="text-[#6B7280] text-sm mt-3 max-w-lg mx-auto">
            Discover our most loved collections crafted for every season.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeTab === tab 
                  ? 'bg-[#182E72] text-white shadow-lg shadow-[#182E72]/25' 
                  : 'bg-[#F8FAFC] text-[#6B7280] hover:bg-[#E9EEFF] hover:text-[#182E72]'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Row header — count left, slide arrows top-right */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#6B7280]">
            <span className="text-[#111827] font-semibold">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full border-2 border-[#182E72] flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? 'border-[#E5E7EB] text-[#182E72] hover:bg-[#182E72] hover:text-white hover:border-[#182E72] hover:shadow-md'
                  : 'border-[#E5E7EB] text-[#D1D5DB] cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full border-2 border-[#182E72] flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? 'border-[#E5E7EB] text-[#182E72] hover:bg-[#182E72] hover:text-white hover:border-[#182E72] hover:shadow-md'
                  : 'border-[#E5E7EB] text-[#D1D5DB] cursor-not-allowed'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Product Row — single row, horizontal scroll/slide */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isHovered = hoveredProduct === product.id;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(24,46,114,0.12)] hover:-translate-y-2 cursor-pointer flex-shrink-0 w-[240px] sm:w-[260px] snap-start"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => navigate(`/products-details/${product.id}`)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F8FAFC]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[#16A34A] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={12} /> New
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-[#DC2626] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Zap size={12} /> -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                      isWishlisted
                        ? 'bg-[#182E72] text-white'
                        : 'bg-white/90 backdrop-blur-sm text-[#6B7280] hover:bg-[#182E72] hover:text-white'
                    } ${isHovered || isWishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
                  </button>

                  {/* Quick View — appears on hover */}
                  <div className={`absolute bottom-3 left-0 right-0 flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products-details/${product.id}`);
                      }}
                      className="flex items-center gap-1.5 bg-white text-[#182E72] text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-[#182E72] hover:text-white transition-colors duration-300"
                    >
                      <Eye size={14} /> Quick View
                    </button>
                  </div>

                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">
                        {product.brand}
                      </p>
                      <h4 className="font-semibold text-[#111827] text-sm mt-1 line-clamp-2">
                        {product.name}
                      </h4>
                    </div>
                    {product.isSale && (
                      <div className="bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                        SALE
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-xs text-[#9CA3AF] ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#182E72]">
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-[#9CA3AF] line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* View Button — appears on hover */}
                  <button className={`
                    w-full mt-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${isHovered 
                      ? 'bg-[#182E72] text-white shadow-lg shadow-[#182E72]/25 translate-y-0 opacity-100' 
                      : 'bg-[#F8FAFC] text-[#6B7280] translate-y-2 opacity-0'
                    }
                    hover:bg-[#2848A0] hover:shadow-xl
                  `}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
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

        /* Hide scrollbar but keep scroll functionality */
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hardware Acceleration */
        .group {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
        }
        
        .group img {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default ProductSection;