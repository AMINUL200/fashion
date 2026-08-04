import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ============================================
// 1. STATIC DATA MOVED OUTSIDE COMPONENT
// ============================================
const CATEGORIES = [
  {
    id: 'men',
    title: 'MEN',
    subtitle: 'Premium Collection',
    price: 'Starting from $39',
    image: '/image/category/men.jpg',
    link: '/products/men',
    layout: 'large',
    height: 'h-[640px]',
    titleSize: 'text-4xl md:text-6xl'
  },
  {
    id: 'women',
    title: 'WOMEN',
    subtitle: 'Elegant Styles',
    price: 'Starting from $45',
    image: '/image/category/women.jpg',
    link: '/products/women',
    layout: 'medium',
    height: 'h-[310px]',
    titleSize: 'text-2xl md:text-3xl'
  },
  {
    id: 'kids',
    title: 'KIDS',
    subtitle: 'Playful Collection',
    price: 'Starting from $25',
    image: '/image/category/kids.jpg',
    link: '/products/kids',
    layout: 'medium',
    height: 'h-[310px]',
    titleSize: 'text-2xl md:text-3xl'
  },
  {
    id: 'footwear',
    title: 'FOOTWEAR',
    subtitle: 'Step in Style',
    price: 'Starting from $59',
    image: '/image/category/footwear.jpg',
    link: '/products/footwear',
    layout: 'large',
    height: 'h-[640px]',
    titleSize: 'text-4xl md:text-6xl'
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    subtitle: 'Complete the Look',
    price: 'Starting from $19',
    image: '/image/category/accessories.jpg',
    link: '/products/accessories',
    layout: 'small',
    height: 'h-[300px]',
    titleSize: 'text-2xl'
  },
  {
    id: 'new-arrivals',
    title: 'NEW ARRIVALS',
    subtitle: 'Fresh Collection',
    price: 'Starting from $35',
    image: '/image/category/new-arrivals.jpg',
    link: '/products/new-arrivals',
    layout: 'small',
    height: 'h-[300px]',
    titleSize: 'text-2xl'
  },
  {
    id: 'sale',
    title: 'SALE',
    subtitle: 'Up to 50% OFF',
    price: 'Starting from $15',
    image: '/image/category/sale.jpg',
    link: '/products/sale',
    layout: 'small',
    height: 'h-[300px]',
    titleSize: 'text-2xl'
  }
];

// ============================================
// 2. FALLBACK IMAGES MOVED OUTSIDE
// ============================================
const FALLBACK_IMAGES = {
  men: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&h=1100&fit=crop&auto=format',
  women: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=600&fit=crop&auto=format',
  kids: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=900&h=600&fit=crop&auto=format',
  footwear: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&h=1100&fit=crop&auto=format',
  accessories: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&h=600&fit=crop&auto=format',
  'new-arrivals': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&h=600&fit=crop&auto=format',
  sale: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&h=600&fit=crop&auto=format'
};

// ============================================
// 3. CATEGORY CARD COMPONENT (MEMOIZED)
// ============================================
const CategoryCard = React.memo(({ category }) => {
  const imageSrc = category.image || FALLBACK_IMAGES[category.id];

  return (
    <div
      className={`
        relative ${category.height} rounded-2xl overflow-hidden 
        group cursor-pointer 
        border border-white/10 
        shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
        transition-all duration-500 ease-out 
        hover:shadow-[0_20px_60px_rgba(24,46,114,0.25)] 
        hover:-translate-y-2 
        transform-gpu
        contain-layout
      `}
      onClick={() => {
        // Use window.location for navigation without re-rendering
        window.location.href = category.link;
      }}
    >
      {/* ===== IMAGE CONTAINER ===== */}
      <div className="absolute inset-0 overflow-hidden transform-gpu">
        <img
          src={imageSrc}
          alt={category.title}
          className="
            w-full h-full object-cover 
            transition-transform duration-700 ease-out 
            transform-gpu
            group-hover:scale-110
          "
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGES[category.id];
          }}
        />
      </div>

      {/* ===== GRADIENT OVERLAY ===== */}
      <div className="
        absolute inset-0 
        bg-gradient-to-t from-black/85 via-black/30 to-black/5 
        transition-opacity duration-500 
        group-hover:opacity-100
        opacity-90
      " />

      {/* ===== TOP SHEEN ===== */}
      <div className="
        absolute inset-0 
        bg-gradient-to-b from-white/10 to-transparent 
        transition-opacity duration-500 
        opacity-0 group-hover:opacity-100
      " />

      {/* ===== CONTENT ===== */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <span className="
          inline-block 
          text-white/70 text-[10px] md:text-xs 
          uppercase tracking-[0.25em] font-medium 
          mb-2
        ">
          {category.subtitle}
        </span>

        <h3 className={`
          font-heading ${category.titleSize} 
          font-bold text-white 
          leading-tight tracking-tight 
          drop-shadow-sm
        `}>
          {category.title}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <p className="text-white/80 text-sm font-medium">
            {category.price}
          </p>

          <button
            className="
              flex items-center gap-2 
              bg-white/10 backdrop-blur-md 
              border border-white/30 
              text-white text-sm px-4 py-2.5 
              rounded-xl font-medium 
              transition-all duration-300 ease-out 
              hover:bg-white hover:text-[#182E72] 
              hover:border-white hover:shadow-lg 
              hover:scale-105 
              transform-gpu
              group-hover:translate-x-0
            "
          >
            Shop Now
            <ArrowRight
              size={16}
              className="
                transition-transform duration-300 ease-out 
                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>

      {/* ===== CORNER ACCENT ===== */}
      <div className="
        absolute top-6 left-6 h-[2px] 
        bg-white/50 
        transition-all duration-500 ease-out 
        group-hover:w-14 group-hover:bg-white
        w-8
      " />
    </div>
  );
});

CategoryCard.displayName = 'CategoryCard';

// ============================================
// 4. MAIN COMPONENT
// ============================================
const ProductCategory = () => {
  // Filter categories by layout for the grid
  const largeCategories = CATEGORIES.filter(c => c.layout === 'large');
  const mediumCategories = CATEGORIES.filter(c => c.layout === 'medium');
  const smallCategories = CATEGORIES.filter(c => c.layout === 'small');

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#6B7280] text-xs uppercase tracking-[0.2em] font-medium">
            Shop by Category
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-[#111827] mt-2">
            Explore Our Collections
          </h2>
          <p className="text-[#6B7280] text-sm mt-3 max-w-lg mx-auto">
            Discover our premium collections crafted for every season.
          </p>
        </div>

        {/* First Row - Large Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* MEN - Large Left */}
          <div className="lg:col-span-3">
            <CategoryCard category={largeCategories[0]} />
          </div>

          {/* Right Side - 2 rows */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-4">
            <CategoryCard category={mediumCategories[0]} />
            <CategoryCard category={mediumCategories[1]} />
          </div>
        </div>

        {/* Second Row - 3 equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {smallCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* ===== GLOBAL STYLES ===== */}
      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        
        /* ===== PERFORMANCE OPTIMIZATIONS ===== */
        
        /* 1. Hardware Acceleration for All Animated Elements */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        /* 2. Prevent Layout Thrashing */
        .contain-layout {
          contain: layout style paint;
        }
        
        /* 3. Optimize Image Rendering */
        .group img {
          image-rendering: auto;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        
        /* 4. Prevent Flickering During Transitions */
        .group {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* 5. Smooth Sub-pixel Rendering */
        .group img {
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }
        
        /* 6. Prevent Flash of Unstyled Content */
        .group {
          min-height: 1px;
        }
      `}</style>
    </section>
  );
};

export default ProductCategory;