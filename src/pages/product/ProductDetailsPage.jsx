import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, Heart, Share2, ChevronLeft, ChevronRight, ChevronDown,
  ShoppingBag, Truck, Shield, RotateCcw, Ruler, Layers, Palette,
  Tag, Clock, Check, Minus, Plus, X, ZoomIn, Eye, MessageCircle,
  User, Calendar, ThumbsUp, ExternalLink
} from 'lucide-react';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openAccordion, setOpenAccordion] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const imageRef = useRef(null);

  const product = {
    id: 1,
    brand: 'Ralph Lauren',
    name: 'Classic Fit Oxford Shirt',
    rating: 4.8,
    reviews: 342,
    price: 89.99,
    oldPrice: 129.99,
    discount: 31,
    description: 'Crafted from premium cotton oxford cloth, this classic fit shirt features a button-down collar, chest pocket, and our signature embroidered pony. Perfect for both casual and formal occasions.',
    shortDescription: 'Premium cotton oxford shirt with classic fit and signature embroidered pony.',
    sku: 'RL-2024-001',
    category: "Men's Shirts",
    availability: 'In Stock',
    features: {
      material: '100% Premium Cotton',
      fit: 'Classic Fit',
      fabric: 'Oxford Cloth',
      pattern: 'Solid',
      sleeve: 'Long Sleeve',
      care: 'Machine wash cold, tumble dry low',
      origin: 'Imported'
    },
    colors: [
      {
        name: 'Black', hex: '#1A1A1A',
        images: [
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1618354691551-44de113f0164?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=800&fit=crop'
        ],
        stock: 15
      },
      {
        name: 'White', hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1623125530775-9cdff98669bf?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1521577352947-9a0c7da6dd6a?w=600&h=800&fit=crop'
        ],
        stock: 12
      },
      {
        name: 'Navy', hex: '#1A237E',
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1623125530775-9cdff98669bf?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1623125530775-9cdff98669bf?w=600&h=800&fit=crop'
        ],
        stock: 8
      },
      {
        name: 'Blue', hex: '#1565C0',
        images: [
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1503341338985-7a32d2e3c25a?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1503341338985-7a32d2e3c25a?w=600&h=800&fit=crop'
        ],
        stock: 10
      }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    sizeStock: { XS: 5, S: 10, M: 15, L: 12, XL: 8, XXL: 3 }
  };

  const currentColor = product.colors.find(c => c.name === selectedColor) || product.colors[0];
  const currentImages = currentColor.images;
  const currentStock = currentColor.stock;

  const reviews = [
    {
      id: 1, customer: 'John D.', rating: 5, date: '2024-01-15',
      text: 'Absolutely perfect shirt! The fit is incredible and the material feels premium. Will definitely buy more colors.',
      images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=200&h=200&fit=crop'],
      verified: true, likes: 24
    },
    {
      id: 2, customer: 'Sarah M.', rating: 4, date: '2024-01-10',
      text: 'Great quality shirt, but runs slightly large. I would recommend sizing down for a more fitted look.',
      images: [], verified: true, likes: 12
    },
    {
      id: 3, customer: 'Michael R.', rating: 5, date: '2024-01-05',
      text: "Best shirt I've ever owned. The craftsmanship is outstanding and it looks amazing with everything.",
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop'],
      verified: true, likes: 18
    }
  ];

  const relatedProducts = [
    { id: 2, name: 'Slim Fit Oxford Shirt', brand: 'Ralph Lauren', price: 79.99, rating: 4.7, reviews: 256, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop', isSale: false },
    { id: 3, name: 'Classic Chino Pants', brand: 'Ralph Lauren', price: 99.99, rating: 4.6, reviews: 189, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', isSale: true, discount: 20 },
    { id: 4, name: 'Merino Wool Sweater', brand: 'Ralph Lauren', price: 149.99, rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop', isSale: false },
    { id: 5, name: 'Classic Blazer', brand: 'Ralph Lauren', price: 249.99, rating: 4.8, reviews: 178, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', isSale: false }
  ];

  const accordionData = [
    { id: 'details', title: 'Product Details', icon: Layers, content: 'This classic fit Oxford shirt is crafted from premium cotton oxford cloth for exceptional comfort and durability. Features a button-down collar, chest pocket, and our signature embroidered pony. Perfect for both casual and formal occasions. The shirt is designed to maintain its shape and quality wash after wash.' },
    { id: 'returns', title: 'Return & Refund Policy', icon: RotateCcw, content: 'We offer a 30-day return policy for all products. Items must be returned in original condition with tags attached. Returns are processed within 3-5 business days. For exchanges, please contact our customer service team. Refunds are issued to the original payment method.' },
    { id: 'shipping', title: 'Shipping Information', icon: Truck, content: 'Free standard shipping on orders over $50. Express shipping available for $15. Orders are processed within 1-2 business days. Delivery times: Standard 3-5 business days, Express 1-2 business days. International shipping available to select countries.' },
    { id: 'size-guide', title: 'Size Guide', icon: Ruler, content: 'Our classic fit is designed to be comfortable and relaxed. We recommend ordering your regular size for the perfect fit. See our size chart for detailed measurements. Size guide available in the product images section.' }
  ];

  const ratingDistribution = [
    { stars: 5, count: 210, percentage: 61 },
    { stars: 4, count: 89, percentage: 26 },
    { stars: 3, count: 32, percentage: 9 },
    { stars: 2, count: 8, percentage: 2 },
    { stars: 1, count: 3, percentage: 1 }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Men', path: '/shop/men' },
    { label: 'T-Shirts', path: '/shop/men/t-shirts' },
    { label: product.name }
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setActiveImage(0);
  };

  const handleSizeSelect = (size) => {
    if (product.sizeStock[size] > 0) setSelectedSize(size);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < 10) setQuantity(quantity + 1);
    else if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
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

  const toggleAccordion = (id) => setOpenAccordion(openAccordion === id ? null : id);

  const renderStars = (rating, size = 16) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < Math.floor(rating) ? 'text-[#FDBA12] fill-current' : 'text-[#E5E7EB]'}
      />
    ));
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-[#9CA3AF]">/</span>}
                {item.path ? (
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-[#6B7280] hover:text-[#182E72] transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="text-[#182E72] font-semibold">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

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
                        ? 'border-[#182E72] shadow-md shadow-[#182E72]/20 scale-[1.03]'
                        : 'border-[#E5E7EB] hover:border-[#182E72] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 order-1 md:order-2 relative group">
                <div
                  ref={imageRef}
                  className="relative bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden cursor-zoom-in shadow-sm hover:shadow-2xl hover:shadow-[#182E72]/10 transition-shadow duration-500"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={currentImages[activeImage]}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-out"
                    style={{
                      transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn size={18} className="text-[#182E72]" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Image counter pill */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-semibold text-[#182E72] px-3 py-1.5 rounded-full shadow-sm">
                  {activeImage + 1} / {currentImages.length}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: PRODUCT INFO ================= */}
          <div className="lg:w-[45%]">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 md:p-8 sticky top-24 shadow-sm">

              {/* Brand + actions */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#6B7280] uppercase tracking-[0.15em] font-semibold">
                  {product.brand}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isWishlist
                        ? 'bg-[#182E72] border-[#182E72] text-white'
                        : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#182E72] hover:text-[#182E72]'
                    }`}
                  >
                    <Heart size={16} className={isWishlist ? 'fill-current' : ''} />
                  </button>
                  <button className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E5E7EB] text-[#6B7280] hover:border-[#182E72] hover:text-[#182E72] transition-all duration-300">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Name */}
              <h1 className="font-semibold text-2xl md:text-[1.75rem] leading-tight text-[#111827] mt-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
                <span className="text-sm font-semibold text-[#111827]">{product.rating}</span>
                <span className="text-sm text-[#6B7280]">·</span>
                <button className="text-sm text-[#182E72] hover:underline underline-offset-2">
                  {product.reviews} reviews
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-5">
                <span className="text-3xl font-bold text-[#182E72] tracking-tight">${product.price}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-[#9CA3AF] line-through">${product.oldPrice}</span>
                    <span className="bg-[#DC2626]/10 text-[#DC2626] text-xs font-bold px-2.5 py-1 rounded-full">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-sm text-[#6B7280] mt-4 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Availability */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm font-semibold text-[#16A34A] flex items-center gap-1.5 bg-[#16A34A]/10 px-3 py-1 rounded-full">
                  <Check size={14} /> In Stock
                </span>
                <span className="text-xs text-[#6B7280]">{currentStock} units left</span>
              </div>

              {/* Color selection */}
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#111827]">Color</h4>
                  <span className="text-sm text-[#6B7280]">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(color.name)}
                      title={color.name}
                      className={`relative w-10 h-10 rounded-full transition-all duration-300 ${
                        selectedColor === color.name
                          ? 'ring-2 ring-offset-2 ring-[#182E72] scale-110'
                          : 'ring-1 ring-[#E5E7EB] hover:ring-[#182E72] hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className={`w-2 h-2 rounded-full shadow ${color.hex === '#FFFFFF' ? 'bg-[#182E72]' : 'bg-white'}`} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#111827]">Size</h4>
                  <button className="text-xs text-[#182E72] hover:underline underline-offset-2 font-medium">
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
                            ? 'bg-[#182E72] text-white border-[#182E72] shadow-md shadow-[#182E72]/25'
                            : inStock
                            ? 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#182E72] hover:text-[#182E72]'
                            : 'bg-[#F8FAFC] text-[#9CA3AF] border-[#E5E7EB] cursor-not-allowed opacity-60 line-through'
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
                <h4 className="text-sm font-semibold text-[#111827] mb-3">Quantity</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E5E7EB] rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F8FAFC] transition-colors active:scale-95"
                    >
                      <Minus size={16} className="text-[#6B7280]" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold text-[#111827]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#F8FAFC] transition-colors active:scale-95"
                    >
                      <Plus size={16} className="text-[#6B7280]" />
                    </button>
                  </div>
                  <span className="text-xs text-[#6B7280]">Max {currentStock} units</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 mt-7">
                <button className="relative overflow-hidden w-full h-[52px] bg-[#182E72] text-white font-semibold rounded-xl transition-all duration-300 hover:bg-[#2848A0] hover:shadow-xl hover:shadow-[#182E72]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2">
                  <ShoppingBag size={20} />
                  Buy Now
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`flex-1 h-[48px] rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
                      isWishlist
                        ? 'bg-[#182E72] text-white border-[#182E72]'
                        : 'bg-white text-[#182E72] border-[#182E72] hover:bg-[#182E72] hover:text-white'
                    }`}
                  >
                    <Heart size={18} className={isWishlist ? 'fill-current' : ''} />
                    {isWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                  </button>
                  <button className="h-[48px] w-[48px] rounded-xl border-2 border-[#E5E7EB] flex items-center justify-center hover:border-[#182E72] hover:text-[#182E72] transition-all duration-200">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-[#F1F5F9]">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck size={20} className="text-[#182E72]" />
                  <span className="text-[11px] text-[#6B7280] font-medium leading-tight">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <RotateCcw size={20} className="text-[#182E72]" />
                  <span className="text-[11px] text-[#6B7280] font-medium leading-tight">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Shield size={20} className="text-[#182E72]" />
                  <span className="text-[11px] text-[#6B7280] font-medium leading-tight">Secure Checkout</span>
                </div>
              </div>

              {/* Product features */}
              <div className="mt-6 pt-6 border-t border-[#F1F5F9]">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Material</p>
                    <p className="text-[#111827] font-medium mt-0.5">{product.features.material}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Fit</p>
                    <p className="text-[#111827] font-medium mt-0.5">{product.features.fit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Fabric</p>
                    <p className="text-[#111827] font-medium mt-0.5">{product.features.fabric}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Pattern</p>
                    <p className="text-[#111827] font-medium mt-0.5">{product.features.pattern}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Sleeve</p>
                    <p className="text-[#111827] font-medium mt-0.5">{product.features.sleeve}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Origin</p>
                    <p className="text-[#111827] font-medium mt-0.5">{product.features.origin}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
                  <p className="text-xs text-[#9CA3AF]">Care Instructions</p>
                  <p className="text-sm text-[#111827] mt-0.5">{product.features.care}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACCORDION ================= */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">
            {accordionData.map((item) => {
              const Icon = item.icon;
              const isOpen = openAccordion === item.id;
              return (
                <div key={item.id} className="border-b border-[#F1F5F9] last:border-b-0">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F8FAFC] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-[#182E72] text-white' : 'bg-[#E9EEFF] text-[#182E72]'
                      }`}>
                        <Icon size={16} />
                      </span>
                      <span className="font-semibold text-[#111827]">{item.title}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-[#6B7280] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#182E72]' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pl-[4.25rem] text-sm text-[#6B7280] leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#182E72]">Feedback</p>
              <h2 className="font-semibold text-2xl text-[#111827] mt-1">Customer Reviews</h2>
            </div>
            <button className="bg-[#182E72] text-white font-medium px-6 py-2.5 text-sm rounded-xl transition-all duration-300 hover:bg-[#2848A0] hover:shadow-lg hover:shadow-[#182E72]/25 hover:-translate-y-0.5">
              Write a Review
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Rating summary */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#111827] tracking-tight">{product.rating}</div>
                <div className="flex justify-center gap-1 mt-2">{renderStars(product.rating, 18)}</div>
                <p className="text-sm text-[#6B7280] mt-1.5">Based on {product.reviews} reviews</p>
              </div>
              <div className="mt-6 space-y-2.5">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-[#6B7280] w-8">{item.stars}★</span>
                    <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FDBA12] to-[#ffd158] rounded-full transition-all duration-700"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#6B7280] w-10 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review cards */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#E9EEFF] flex items-center justify-center">
                          <User size={18} className="text-[#182E72]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#111827]">{review.customer}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">{renderStars(review.rating, 12)}</div>
                            <span className="text-xs text-[#9CA3AF]">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#16A34A] mt-2 bg-[#16A34A]/10 px-2 py-0.5 rounded-full">
                          <Check size={11} /> Verified Purchase
                        </span>
                      )}
                    </div>
                    <button className="flex items-center gap-1 text-[#6B7280] hover:text-[#182E72] transition-colors">
                      <ThumbsUp size={15} />
                      <span className="text-xs">{review.likes}</span>
                    </button>
                  </div>
                  <p className="text-sm text-[#6B7280] mt-3 leading-relaxed">{review.text}</p>
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {review.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Review ${i + 1}`}
                          className="w-16 h-16 rounded-lg object-cover border border-[#E5E7EB]"
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
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#182E72]">You may also like</p>
          <h2 className="font-semibold text-2xl text-[#111827] mt-1 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                onClick={() => navigate(`/product/${rp.id}`)}
                className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#182E72]/10 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F8FAFC]">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {rp.isSale && (
                    <span className="absolute top-3 left-3 bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{rp.discount}%
                    </span>
                  )}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#182E72] hover:text-white"
                  >
                    <Heart size={16} />
                  </button>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button className="bg-white text-[#111827] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#182E72] hover:text-white transition-all duration-300">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">{rp.brand}</p>
                  <h4 className="font-medium text-[#111827] text-sm mt-1 line-clamp-2 group-hover:text-[#182E72] transition-colors">
                    {rp.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1.5">
                    {renderStars(rp.rating, 12)}
                    <span className="text-xs text-[#9CA3AF] ml-1">({rp.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#182E72]">${rp.price}</span>
                    {rp.isSale && (
                      <span className="text-sm text-[#9CA3AF] line-through">
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

      {/* ================= MOBILE STICKY BUY BAR ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#6B7280] truncate">{product.name}</p>
            <p className="text-lg font-bold text-[#182E72]">${product.price}</p>
          </div>
          <button className="flex-1 h-12 bg-[#182E72] text-white font-semibold rounded-xl transition-all duration-300 hover:bg-[#2848A0] active:scale-[0.98]">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;