import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Ruler,
  Layers,
  Palette,
  Tag,
  Clock,
  Check,
  Minus,
  Plus,
  X,
  ZoomIn,
  Eye,
  MessageCircle,
  User,
  Calendar,
  ThumbsUp,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import PromotionVideo from "../../component/common/PromotionVideo";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openAccordion, setOpenAccordion] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const imageRef = useRef(null);

  const product = {
    id: 1,
    brand: "Ralph Lauren",
    name: "Classic Fit Oxford Shirt",
    rating: 4.8,
    reviews: 342,
    price: 89.99,
    oldPrice: 129.99,
    discount: 31,
    description:
      "Crafted from premium cotton oxford cloth, this classic fit shirt features a button-down collar, chest pocket, and our signature embroidered pony. Perfect for both casual and formal occasions.",
    shortDescription:
      "Premium cotton oxford shirt with classic fit and signature embroidered pony.",
    sku: "RL-2024-001",
    category: "Men's Shirts",
    availability: "In Stock",
    features: {
      material: "100% Premium Cotton",
      fit: "Classic Fit",
      fabric: "Oxford Cloth",
      pattern: "Solid",
      sleeve: "Long Sleeve",
      care: "Machine wash cold, tumble dry low",
      origin: "Imported",
    },
    colors: [
      {
        name: "Black",
        hex: "#1A1A1A",
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1618354691551-44de113f0164?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=800&fit=crop",
        ],
        stock: 15,
      },
      {
        name: "White",
        hex: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1623125530775-9cdff98669bf?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1521577352947-9a0c7da6dd6a?w=600&h=800&fit=crop",
        ],
        stock: 12,
      },
      {
        name: "Navy",
        hex: "#1A237E",
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1623125530775-9cdff98669bf?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1623125530775-9cdff98669bf?w=600&h=800&fit=crop",
        ],
        stock: 8,
      },
      {
        name: "Blue",
        hex: "#1565C0",
        images: [
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1503341338985-7a32d2e3c25a?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop",
          "https://images.unsplash.com/photo-1503341338985-7a32d2e3c25a?w=600&h=800&fit=crop",
        ],
        stock: 10,
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    sizeStock: { XS: 5, S: 10, M: 15, L: 12, XL: 8, XXL: 3 },
  };

  const currentColor =
    product.colors.find((c) => c.name === selectedColor) || product.colors[0];
  const currentImages = currentColor.images;
  const currentStock = currentColor.stock;

  const reviews = [
    {
      id: 1,
      customer: "John D.",
      rating: 5,
      date: "2024-01-15",
      text: "Absolutely perfect shirt! The fit is incredible and the material feels premium. Will definitely buy more colors.",
      images: [
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=200&h=200&fit=crop",
      ],
      verified: true,
      likes: 24,
    },
    {
      id: 2,
      customer: "Sarah M.",
      rating: 4,
      date: "2024-01-10",
      text: "Great quality shirt, but runs slightly large. I would recommend sizing down for a more fitted look.",
      images: [],
      verified: true,
      likes: 12,
    },
    {
      id: 3,
      customer: "Michael R.",
      rating: 5,
      date: "2024-01-05",
      text: "Best shirt I've ever owned. The craftsmanship is outstanding and it looks amazing with everything.",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
      ],
      verified: true,
      likes: 18,
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Slim Fit Oxford Shirt",
      brand: "Ralph Lauren",
      price: 79.99,
      rating: 4.7,
      reviews: 256,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
      isSale: false,
    },
    {
      id: 3,
      name: "Classic Chino Pants",
      brand: "Ralph Lauren",
      price: 99.99,
      rating: 4.6,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
      isSale: true,
      discount: 20,
    },
    {
      id: 4,
      name: "Merino Wool Sweater",
      brand: "Ralph Lauren",
      price: 149.99,
      rating: 4.9,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop",
      isSale: false,
    },
    {
      id: 5,
      name: "Classic Blazer",
      brand: "Ralph Lauren",
      price: 249.99,
      rating: 4.8,
      reviews: 178,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
      isSale: false,
    },
  ];

  const accordionData = [
    {
      id: "details",
      title: "Product Details",
      icon: Layers,
      content:
        "This classic fit Oxford shirt is crafted from premium cotton oxford cloth for exceptional comfort and durability. Features a button-down collar, chest pocket, and our signature embroidered pony. Perfect for both casual and formal occasions. The shirt is designed to maintain its shape and quality wash after wash.",
    },
    {
      id: "returns",
      title: "Return & Refund Policy",
      icon: RotateCcw,
      content:
        "We offer a 30-day return policy for all products. Items must be returned in original condition with tags attached. Returns are processed within 3-5 business days. For exchanges, please contact our customer service team. Refunds are issued to the original payment method.",
    },
    {
      id: "shipping",
      title: "Shipping Information",
      icon: Truck,
      content:
        "Free standard shipping on orders over $50. Express shipping available for $15. Orders are processed within 1-2 business days. Delivery times: Standard 3-5 business days, Express 1-2 business days. International shipping available to select countries.",
    },
    {
      id: "size-guide",
      title: "Size Guide",
      icon: Ruler,
      content:
        "Our classic fit is designed to be comfortable and relaxed. We recommend ordering your regular size for the perfect fit. See our size chart for detailed measurements. Size guide available in the product images section.",
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 210, percentage: 61 },
    { stars: 4, count: 89, percentage: 26 },
    { stars: 3, count: 32, percentage: 9 },
    { stars: 2, count: 8, percentage: 2 },
    { stars: 1, count: 3, percentage: 1 },
  ];

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Men", path: "/shop/men" },
    { label: "T-Shirts", path: "/shop/men/t-shirts" },
    { label: product.name },
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setActiveImage(0);
  };

  const handleSizeSelect = (size) => {
    if (product.sizeStock[size] > 0) setSelectedSize(size);
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < 10) setQuantity(quantity + 1);
    else if (type === "decrease" && quantity > 1) setQuantity(quantity - 1);
  };

  const handleImageClick = (index) => setActiveImage(index);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const toggleAccordion = (id) =>
    setOpenAccordion(openAccordion === id ? null : id);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  const renderStars = (rating, size = 16) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={
          i < Math.floor(rating)
            ? "text-[#D19701] fill-current"
            : "text-[#EFE7C8]"
        }
      />
    ));
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-30">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ================= LEFT: IMAGE GALLERY ================= */}
          <div className="lg:w-[55%]">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {currentImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`w-20 h-24 flex-shrink-0 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                      activeImage === index
                        ? "border-[#D19701] shadow-md shadow-[#D19701]/20 scale-[1.03]"
                        : "border-[#EFE7C8] hover:border-[#D19701] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 order-1 md:order-2 relative group">
                <div
                  ref={imageRef}
                  className="relative bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden cursor-zoom-in shadow-sm hover:shadow-2xl hover:shadow-[#D19701]/10 transition-shadow duration-500"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={currentImages[activeImage]}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-out"
                    style={{
                      transform: isZoomed ? "scale(1.8)" : "scale(1)",
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }}
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn size={18} className="text-[#D19701]" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Image counter pill */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-semibold text-[#D19701] px-3 py-1.5 rounded-full shadow-sm border border-[#EFE7C8]">
                  {activeImage + 1} / {currentImages.length}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: PRODUCT INFO ================= */}
          <div className="lg:w-[45%]">
            <div className="bg-white rounded-3xl border border-[#EFE7C8] p-6 md:p-8 sticky top-24 shadow-sm">
              {/* Brand + actions */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#666666] uppercase tracking-[0.15em] font-semibold">
                  {product.brand}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isWishlist
                        ? "bg-[#D19701] border-[#D19701] text-white"
                        : "border-[#EFE7C8] text-[#666666] hover:border-[#D19701] hover:text-[#D19701]"
                    }`}
                  >
                    <Heart
                      size={16}
                      className={isWishlist ? "fill-current" : ""}
                    />
                  </button>
                  <button className="w-9 h-9 rounded-full flex items-center justify-center border border-[#EFE7C8] text-[#666666] hover:border-[#D19701] hover:text-[#D19701] transition-all duration-300">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Name */}
              <h1 className="font-heading text-2xl md:text-[1.75rem] leading-tight text-[#111111] mt-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm font-semibold text-[#111111]">
                  {product.rating}
                </span>
                <span className="text-sm text-[#666666]">·</span>
                <button className="text-sm text-[#D19701] hover:underline underline-offset-2">
                  {product.reviews} reviews
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-5">
                <span className="text-3xl font-heading font-bold text-[#D19701] tracking-tight">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-[#999999] line-through">
                      ${product.oldPrice}
                    </span>
                    <span className="bg-[#D19701]/10 text-[#B67E00] text-xs font-bold px-2.5 py-1 rounded-full">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-sm text-[#666666] mt-4 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Availability */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm font-semibold text-[#D19701] flex items-center gap-1.5 bg-[#D19701]/10 px-3 py-1 rounded-full">
                  <Check size={14} /> In Stock
                </span>
                <span className="text-xs text-[#666666]">
                  {currentStock} units left
                </span>
              </div>

              {/* Color selection */}
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#111111]">
                    Color
                  </h4>
                  <span className="text-sm text-[#666666]">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(color.name)}
                      title={color.name}
                      className={`relative w-10 h-10 rounded-full transition-all duration-300 ${
                        selectedColor === color.name
                          ? "ring-2 ring-offset-2 ring-[#D19701] scale-110"
                          : "ring-1 ring-[#EFE7C8] hover:ring-[#D19701] hover:scale-110"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`w-2 h-2 rounded-full shadow ${color.hex === "#FFFFFF" ? "bg-[#D19701]" : "bg-white"}`}
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#111111]">Size</h4>
                  <button className="text-xs text-[#D19701] hover:underline underline-offset-2 font-medium">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const inStock = product.sizeStock[size] > 0;
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        disabled={!inStock}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all duration-200 active:scale-95 ${
                          selectedSize === size && inStock
                            ? "bg-[#D19701] text-white border-[#D19701] shadow-md shadow-[#D19701]/25"
                            : inStock
                              ? "bg-white text-[#666666] border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701]"
                              : "bg-[#FDFBD4] text-[#999999] border-[#EFE7C8] cursor-not-allowed opacity-60 line-through"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-7">
                <h4 className="text-sm font-semibold text-[#111111] mb-3">
                  Quantity
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#EFE7C8] rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#FDFBD4] transition-colors active:scale-95"
                    >
                      <Minus size={16} className="text-[#666666]" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold text-[#111111]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#FDFBD4] transition-colors active:scale-95"
                    >
                      <Plus size={16} className="text-[#666666]" />
                    </button>
                  </div>
                  <span className="text-xs text-[#666666]">
                    Max {currentStock} units
                  </span>
                </div>
              </div>

              {/* ===== UPDATED CTA SECTION - Gold Theme ===== */}
              <div className="mt-7 space-y-3">
                {/* Main Action Row - Add to Cart + Buy Now */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`relative overflow-hidden flex-1 h-[52px] font-semibold rounded-[14px] transition-all duration-300 flex items-center justify-center gap-2 ${
                      isAddedToCart
                        ? "bg-[#16A34A] text-white hover:bg-[#15803D]"
                        : "bg-[#FDFBD4] text-[#5A3A00] border-2 border-[#D19701] hover:bg-[#D19701] hover:text-white hover:shadow-lg hover:shadow-[#D19701]/30 hover:-translate-y-0.5"
                    }`}
                  >
                    {isAddedToCart ? (
                      <>
                        <Check size={20} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => navigate("/checkout/1")}
                    className="flex-1 h-[52px] font-semibold rounded-[14px] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                      color: '#5A3A00',
                      border: '1px solid #C38A00',
                      boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                    }}
                  >
                    <ShoppingBag size={20} />
                    Buy Now
                  </button>
                </div>

                {/* Secondary Actions - Wishlist & Share */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`flex-1 h-[48px] rounded-[14px] border-2 transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
                      isWishlist
                        ? "bg-[#D19701] text-white border-[#D19701] shadow-md shadow-[#D19701]/20"
                        : "bg-white text-[#5A3A00] border-[#D19701] hover:bg-[#D19701] hover:text-white hover:shadow-lg hover:shadow-[#D19701]/20"
                    }`}
                  >
                    <Heart
                      size={18}
                      className={isWishlist ? "fill-current" : ""}
                    />
                    {isWishlist ? "Wishlisted" : "Add to Wishlist"}
                  </button>
                  <button className="h-[48px] w-[48px] rounded-[14px] border-2 border-[#EFE7C8] flex items-center justify-center hover:border-[#D19701] hover:text-[#D19701] hover:bg-[#FDFBD4] transition-all duration-200">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* ===== Price Summary Bar ===== */}
              <div className="mt-4 p-3 bg-[#FDFBD4] rounded-xl border border-[#EFE7C8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#666666]">
                    Total:
                  </span>
                  <span className="text-lg font-heading font-bold text-[#D19701]">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck size={14} className="text-[#D19701]" />
                  <span className="text-xs text-[#666666]">Free Shipping</span>
                </div>
              </div>

              {/* Trust badges - Gold Theme */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-[#EFE7C8]">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck size={20} className="text-[#D19701]" />
                  <span className="text-[11px] text-[#666666] font-medium leading-tight">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <RotateCcw size={20} className="text-[#D19701]" />
                  <span className="text-[11px] text-[#666666] font-medium leading-tight">
                    30-Day Returns
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Shield size={20} className="text-[#D19701]" />
                  <span className="text-[11px] text-[#666666] font-medium leading-tight">
                    Secure Checkout
                  </span>
                </div>
              </div>

              {/* Product features */}
              <div className="mt-6 pt-6 border-t border-[#EFE7C8]">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-[#999999]">Material</p>
                    <p className="text-[#111111] font-medium mt-0.5">
                      {product.features.material}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#999999]">Fit</p>
                    <p className="text-[#111111] font-medium mt-0.5">
                      {product.features.fit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#999999]">Fabric</p>
                    <p className="text-[#111111] font-medium mt-0.5">
                      {product.features.fabric}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#999999]">Pattern</p>
                    <p className="text-[#111111] font-medium mt-0.5">
                      {product.features.pattern}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#999999]">Sleeve</p>
                    <p className="text-[#111111] font-medium mt-0.5">
                      {product.features.sleeve}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#999999]">Origin</p>
                    <p className="text-[#111111] font-medium mt-0.5">
                      {product.features.origin}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#EFE7C8]">
                  <p className="text-xs text-[#999999]">Care Instructions</p>
                  <p className="text-sm text-[#111111] mt-0.5">
                    {product.features.care}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACCORDION - Gold Theme ================= */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden shadow-sm">
            {accordionData.map((item) => {
              const Icon = item.icon;
              const isOpen = openAccordion === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-[#EFE7C8] last:border-b-0"
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#FDFBD4] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "bg-[#D19701] text-white"
                            : "bg-[#FDFBD4] text-[#D19701]"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="font-heading font-semibold text-[#111111]">
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-[#666666] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#D19701]" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pl-[4.25rem] text-sm text-[#666666] leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= REVIEWS - Gold Theme ================= */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#D19701]">
                Feedback
              </p>
              <h2 className="font-heading text-2xl text-[#111111] mt-1">
                Customer Reviews
              </h2>
            </div>
            <button className="text-[#5A3A00] font-medium px-6 py-2.5 text-sm rounded-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                border: '1px solid #C38A00',
                boxShadow: '0 8px 20px rgba(209,151,1,0.25)',
              }}
            >
              Write a Review
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Rating summary */}
            <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
              <div className="text-center">
                <div className="text-5xl font-heading font-bold text-[#D19701] tracking-tight">
                  {product.rating}
                </div>
                <div className="flex justify-center gap-1 mt-2">
                  {renderStars(product.rating, 18)}
                </div>
                <p className="text-sm text-[#666666] mt-1.5">
                  Based on {product.reviews} reviews
                </p>
              </div>
              <div className="mt-6 space-y-2.5">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-[#666666] w-8">
                      {item.stars}★
                    </span>
                    <div className="flex-1 h-2 bg-[#FDFBD4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B67E00] via-[#D19701] to-[#FFF19C] rounded-full transition-all duration-700"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#666666] w-10 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review cards */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#FDFBD4] flex items-center justify-center">
                          <User size={18} className="text-[#D19701]" />
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-[#111111]">
                            {review.customer}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {renderStars(review.rating, 12)}
                            </div>
                            <span className="text-xs text-[#999999]">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#D19701] mt-2 bg-[#D19701]/10 px-2 py-0.5 rounded-full">
                          <Check size={11} /> Verified Purchase
                        </span>
                      )}
                    </div>
                    <button className="flex items-center gap-1 text-[#666666] hover:text-[#D19701] transition-colors">
                      <ThumbsUp size={15} />
                      <span className="text-xs">{review.likes}</span>
                    </button>
                  </div>
                  <p className="text-sm text-[#666666] mt-3 leading-relaxed">
                    {review.text}
                  </p>
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {review.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Review ${i + 1}`}
                          className="w-16 h-16 rounded-lg object-cover border border-[#EFE7C8]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        <div className="mt-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#D19701]">
            You may also like
          </p>
          <h2 className="font-heading text-2xl text-[#111111] mt-1 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                onClick={() => navigate(`/product/${rp.id}`)}
                className="group bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#D19701]/10 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#FDFBD4]">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {rp.isSale && (
                    <span className="absolute top-3 left-3 bg-[#D19701] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{rp.discount}%
                    </span>
                  )}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#D19701] hover:text-white"
                  >
                    <Heart size={16} />
                  </button>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button className="text-[#5A3A00] px-4 py-2 rounded-[14px] text-sm font-semibold transition-all duration-300"
                      style={{
                        background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                        border: '1px solid #C38A00',
                        boxShadow: '0 8px 20px rgba(209,151,1,0.25)',
                      }}
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#999999] uppercase tracking-wider">
                    {rp.brand}
                  </p>
                  <h4 className="font-medium text-[#111111] text-sm mt-1 line-clamp-2 group-hover:text-[#D19701] transition-colors">
                    {rp.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1.5">
                    {renderStars(rp.rating, 12)}
                    <span className="text-xs text-[#999999] ml-1">
                      ({rp.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-heading font-bold text-[#D19701]">
                      ${rp.price}
                    </span>
                    {rp.isSale && (
                      <span className="text-sm text-[#999999] line-through">
                        ${(rp.price * 1.2).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MOBILE STICKY BUY BAR - Gold Theme ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EFE7C8] p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#666666] truncate">{product.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-heading font-bold text-[#D19701]">
                ${(product.price * quantity).toFixed(2)}
              </p>
              <span className="text-xs text-[#666666]">Qty: {quantity}</span>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className={`px-4 h-12 rounded-[14px] font-semibold transition-all duration-300 flex items-center gap-2 ${
              isAddedToCart
                ? "bg-[#16A34A] text-white"
                : "bg-[#FDFBD4] text-[#5A3A00] border-2 border-[#D19701] hover:bg-[#D19701] hover:text-white"
            }`}
          >
            {isAddedToCart ? (
              <>
                <Check size={18} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                Add
              </>
            )}
          </button>
          <button 
            onClick={() => navigate('/checkout/1')}
            className="flex-1 h-12 font-semibold rounded-[14px] transition-all duration-300 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
              color: '#5A3A00',
              border: '1px solid #C38A00',
              boxShadow: '0 8px 20px rgba(209,151,1,0.25)',
            }}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* ===== Toast Notification ===== */}
      {isAddedToCart && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#D19701] text-[#5A3A00] px-6 py-3 rounded-[14px] shadow-2xl shadow-[#D19701]/30 z-50 animate-slide-up flex items-center gap-3 border border-[#C38A00]">
          <Check size={20} className="text-[#5A3A00]" />
          <span className="font-medium">Added to cart successfully!</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;