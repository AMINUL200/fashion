import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Eye,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const ProductSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);

  const tabs = ["All", "Men", "Women", "Kids", "Accessories"];

  const products = [
    {
      id: 4,
      name: "Performance Dry-Fit Tee",
      brand: "HELLCAT",
      price: 449,
      oldPrice: 2799,
      rating: 4.3,
      reviews: 2800,
      image: "/image/product/product1.png",
      category: "Women",
      isNew: false,
      isSale: true,
      discount: 84,
      description: "Performance dry-fit training tee",
    },
    {
      id: 5,
      name: "Classic Striped T-Shirt",
      brand: "HELLCAT",
      price: 329,
      oldPrice: 1799,
      rating: 4.1,
      reviews: 1900,
      image: "/image/product/product2.png",
      category: "Women",
      isNew: false,
      isSale: true,
      discount: 82,
      description: "Classic striped casual t-shirt",
    },
    {
      id: 6,
      name: "Premium Cotton Crew",
      brand: "HELLCAT",
      price: 279,
      oldPrice: 1899,
      rating: 4.4,
      reviews: 1500,
      image: "/image/product/product3.jpg",
      category: "Women",
      isNew: true,
      isSale: true,
      discount: 85,
      description: "Premium cotton crew neck tee",
    },
    {
      id: 1,
      name: "Classic White T-Shirt",
      brand: "HELLCAT",
      price: 299,
      oldPrice: 1999,
      rating: 4.0,
      reviews: 5800,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&auto=format",
      category: "Men",
      isNew: true,
      isSale: true,
      discount: 85,
      description: "Premium cotton classic white t-shirt",
    },
    {
      id: 2,
      name: "Premium Black Tee",
      brand: "HELLCAT",
      price: 349,
      oldPrice: 2199,
      rating: 4.5,
      reviews: 4200,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop&auto=format",
      category: "Men",
      isNew: false,
      isSale: true,
      discount: 84,
      description: "Premium black essential t-shirt",
    },
    {
      id: 3,
      name: "Vintage Graphic Tee",
      brand: "HELLCAT",
      price: 399,
      oldPrice: 2499,
      rating: 4.2,
      reviews: 3100,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&auto=format",
      category: "Men",
      isNew: true,
      isSale: true,
      discount: 84,
      description: "Vintage graphic printed t-shirt",
    },

    {
      id: 7,
      name: "Essential Logo Tee",
      brand: "HELLCAT",
      price: 249,
      oldPrice: 1599,
      rating: 4.0,
      reviews: 1200,
      image:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=500&fit=crop&auto=format",
      category: "Kids",
      isNew: false,
      isSale: true,
      discount: 84,
      description: "Essential logo printed tee",
    },
    {
      id: 8,
      name: "Sport Mesh T-Shirt",
      brand: "HELLCAT",
      price: 499,
      oldPrice: 2999,
      rating: 4.7,
      reviews: 2200,
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop&auto=format",
      category: "Women",
      isNew: false,
      isSale: true,
      discount: 83,
      description: "Sport mesh breathable t-shirt",
    },
  ];

  // Filter products based on active tab
  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  // Toggle wishlist
  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  // Render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < fullStars ? "text-[#D19701] fill-current" : "text-[#D1D5DB]"
            }
          />
        ))}
        <span className="text-[11px] font-medium text-[#111111] ml-1">
          {rating}
        </span>
        <span className="text-[11px] text-[#999999]">
          ({(reviews / 1000).toFixed(1)}K)
        </span>
      </div>
    );
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
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 28 : 238;
    el.scrollBy({
      left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  };

  // Reset scroll position whenever the category changes, and re-check arrow state
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: "auto" });
    }
    const timeout = setTimeout(updateScrollButtons, 50);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <section className="bg-[#111111] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Premium Gold Styling */}
        <div className="text-center mb-10">
          <span className="text-[#D19701] text-xs uppercase tracking-[0.25em] font-semibold">
            Recommended
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-[#FFFFFF] mt-2">
            Best Selling Products
          </h2>
          <div className="flex justify-center mt-3">
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#B67E00] via-[#D19701] to-[#FFF19C] rounded-full" />
          </div>
          <p className="text-[#999999] text-sm mt-4 max-w-lg mx-auto">
            Discover our most loved collections crafted for every season.
          </p>
        </div>

        {/* Tabs - Premium Gold Theme */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-[8px] text-sm font-medium transition-all duration-300"
              style={{
                height: "42px",
                background:
                  activeTab === tab
                    ? "linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)"
                    : "#222222",
                color: activeTab === tab ? "#3E2500" : "#FFFFFF",
                border:
                  activeTab === tab ? "1px solid #B67E00" : "1px solid #555555",
                boxShadow:
                  activeTab === tab
                    ? "0 8px 18px rgba(209,151,1,0.25)"
                    : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Row header — count left, slide arrows top-right */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#999999]">
            <span className="text-[#FFFFFF] font-semibold">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? "border-[#D19701] text-[#D19701] hover:bg-[#D19701] hover:text-[#111111] hover:border-[#D19701] hover:shadow-md"
                  : "border-[#333333] text-[#555555] cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? "border-[#D19701] text-[#D19701] hover:bg-[#D19701] hover:text-[#111111] hover:border-[#D19701] hover:shadow-md"
                  : "border-[#333333] text-[#555555] cursor-not-allowed"
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
          className="flex gap-7 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isHovered = hoveredProduct === product.id;
            const reviews = product.reviews;

            return (
              <div
                key={product.id}
                className="group relative bg-[#FFFFFF] rounded-[8px] border border-[#ECECEC] overflow-hidden transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:-translate-y-[6px] cursor-pointer flex-shrink-0 w-[210px] snap-start"
                style={{ padding: "12px" }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => navigate(`/products-details/${product.id}`)}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden bg-[#F7F7F7] rounded-[6px]"
                  style={{ height: "250px", width: "100%" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-[#111111] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles size={10} /> New
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-[#D19701] text-[#111111] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap size={10} /> -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                      isWishlisted
                        ? "bg-[#D19701] text-[#111111]"
                        : "bg-white/90 backdrop-blur-sm text-[#666666] hover:bg-[#D19701] hover:text-[#111111]"
                    } ${isHovered || isWishlisted ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  >
                    <Heart
                      size={14}
                      className={isWishlisted ? "fill-current" : ""}
                    />
                  </button>

                  {/* Quick View — appears on hover */}
                  <div
                    className={`absolute bottom-2 left-0 right-0 flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products-details/${product.id}`);
                      }}
                      className="flex items-center gap-1 text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                      style={{
                        background:
                          "linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)",
                        color: "#3E2500",
                        border: "1px solid #B67E00",
                      }}
                    >
                      <Eye size={12} /> Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-3">
                  {/* Brand and Rating */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-[18px] font-bold text-[#111111] uppercase tracking-[0.5px]">
                      {product.brand}
                    </h3>
                    <div className="flex items-center gap-1 bg-[#F8F8F8] border border-[#E6E6E6] rounded-[4px] px-2 py-0.5">
                      <Star size={11} className="text-[#D19701] fill-current" />
                      <span className="text-[11px] font-medium text-[#111111]">
                        {product.rating}
                      </span>
                      <span className="text-[11px] text-[#999999]">
                        ({(reviews / 1000).toFixed(1)}K)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[11px] text-[#777777] mt-1 line-clamp-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: "1.5",
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-end gap-2 mt-2">
                    <span className="font-heading text-[24px] font-bold text-[#111111] leading-none">
                      ₹{product.price}
                    </span>
                    <span className="text-[14px] text-[#999999] line-through mb-1">
                      ₹{product.oldPrice}
                    </span>
                    <span className="text-[14px] font-semibold text-[#5BAE3B] mb-1">
                      ({product.discount}% off)
                    </span>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products-details/${product.id}`);
                    }}
                    className="w-full mt-3 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-[2px]"
                    style={{
                      height: "44px",
                      background:
                        "linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)",
                      color: "#3E2500",
                      border: "1px solid #B67E00",
                      borderRadius: "8px",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      boxShadow: "0 4px 12px rgba(209,151,1,0.15)",
                    }}
                  >
                    VIEW DETAILS
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .font-heading {
          font-family: "Poppins", sans-serif;
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
