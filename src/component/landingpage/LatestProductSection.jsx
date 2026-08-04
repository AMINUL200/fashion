import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Star, 
  Clock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

const LatestProductSection = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const intervalRef = useRef(null);

  const featuredProducts = [
    { id: 101, name: 'Aero Runner Sneakers', brand: 'Under Armour', price: 89.99, rating: 4.9, reviews: 214, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&h=1100&fit=crop&auto=format', tag: 'Just Dropped' },
    { id: 106, name: 'Nightfall Bomber Jacket', brand: 'Zara', price: 94.99, rating: 4.8, reviews: 143, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&h=1100&fit=crop&auto=format', tag: 'Trending' },
    { id: 107, name: 'Studio Cargo Set', brand: 'Puma', price: 79.99, rating: 4.7, reviews: 88, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&h=1100&fit=crop&auto=format', tag: 'New' },
    { id: 108, name: 'Heritage Leather Duffel', brand: 'Ralph Lauren', price: 149.99, rating: 5.0, reviews: 61, image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&h=1100&fit=crop&auto=format', tag: 'Limited' }
  ];

  const marqueeTop = [
    { id: 102, name: 'Oversized Hoodie', brand: 'Nike', price: 54.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop&auto=format', tag: 'New' },
    { id: 103, name: 'Utility Cargo Pants', brand: 'Puma', price: 64.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop&auto=format', tag: 'New' },
    { id: 104, name: 'Classic Denim Jacket', brand: 'Zara', price: 74.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop&auto=format', tag: 'Trending' },
    { id: 105, name: 'Minimal Leather Bag', brand: 'Ralph Lauren', price: 119.99, rating: 5.0, image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&h=600&fit=crop&auto=format', tag: 'New' },
  ];

  const marqueeBottom = [
    { id: 109, name: 'Track Jacket', brand: 'Adidas', price: 59.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&auto=format', tag: 'New' },
    { id: 110, name: 'Mesh Training Tee', brand: 'Under Armour', price: 34.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop&auto=format', tag: 'Trending' },
    { id: 111, name: 'Everyday Cap', brand: 'Nike', price: 24.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&h=600&fit=crop&auto=format', tag: 'New' },
    { id: 112, name: 'Slim Fit Chinos', brand: 'Zara', price: 49.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop&auto=format', tag: 'New' },
  ];

  const featured = featuredProducts[featuredIndex];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % featuredProducts.length);
        setFadeIn(true);
      }, 350);
    }, 4200);
    return () => clearInterval(intervalRef.current);
  }, []);

  const renderStars = (rating) => (
    [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? 'text-[#FDBA12] fill-current' : 'text-white/20'}
      />
    ))
  );

  const MarqueeCard = ({ product }) => {
    const isHovered = hoveredId === `m-${product.id}`;
    return (
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 flex-shrink-0 w-[190px] h-full min-w-0"
        onMouseEnter={() => setHoveredId(`m-${product.id}`)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => navigate(`/products-details/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out transform-gpu"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-semibold px-2 py-1 rounded-full">
          {product.tag}
        </div>

        <div className={`absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
        }`}>
          <ArrowUpRight size={12} className="text-white" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p className="text-white/60 text-[9px] uppercase tracking-wider font-medium">{product.brand}</p>
          <h4 className="font-semibold text-white text-xs mt-0.5 leading-snug line-clamp-1">{product.name}</h4>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-white text-sm font-bold">${product.price}</span>
            <div className="flex items-center gap-0.5">
              <Star size={10} className="text-[#FDBA12] fill-current" />
              <span className="text-white/70 text-[10px]">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    // FIX 1: Add overflow-x-hidden to the root section
    <section className="relative bg-[#0B1120] min-h-screen flex flex-col justify-center overflow-x-hidden overflow-y-visible py-10 lg:py-0">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#182E72]/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2848A0]/20 rounded-full blur-[120px]" />

      {/* FIX 2: Add overflow-x-hidden to the container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 lg:justify-center lg:py-16 overflow-x-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 lg:mb-10 flex-shrink-0">
          <div>
            <span className="inline-flex items-center gap-2 text-[#8FA0E8] text-xs uppercase tracking-[0.25em] font-medium">
              <Sparkles size={14} />
              Fresh Drop
            </span>
            <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 leading-tight">
              Latest Arrivals
            </h2>
            <p className="text-[#94A3B8] text-sm mt-3 max-w-md">
              The newest pieces, straight off the line — updated weekly.
            </p>
          </div>
          <button
            onClick={() => navigate('/new-arrivals')}
            className="group inline-flex items-center gap-2 self-start md:self-auto text-white text-sm font-medium border border-white/20 px-5 py-3 rounded-full hover:bg-white hover:text-[#0B1120] transition-all duration-300"
          >
            View All
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Layout: fixed rotating hero left, two marquee rows right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch flex-1 min-h-[520px] lg:min-h-0 min-w-0">
          {/* LEFT — fixed position, content rotates */}
          <div
            className="lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 h-full min-h-[420px] min-w-0"
            onClick={() => navigate(`/products-details/${featured.id}`)}
          >
            <img
              src={featured.image}
              alt={featured.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out transform-gpu ${
                fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{ transitionProperty: 'opacity, transform', transitionDuration: '500ms, 4000ms' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className={`absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
              <Clock size={12} />
              {featured.tag}
            </div>

            <div className="absolute top-6 right-6 flex items-center gap-1.5">
              {featuredProducts.map((p, i) => (
                <span
                  key={p.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === featuredIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div className={`absolute inset-x-0 bottom-0 p-7 md:p-9 transition-opacity duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-medium mb-2">{featured.brand}</p>
              <h3 className="font-heading text-2xl md:text-4xl text-white font-bold leading-tight max-w-sm">
                {featured.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="flex items-center">{renderStars(featured.rating)}</div>
                <span className="text-white text-sm font-medium ml-1">{featured.rating}</span>
                <span className="text-white/50 text-xs">({featured.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-3xl font-bold text-white">${featured.price}</span>
                <button className="flex items-center gap-2 bg-white text-[#0B1120] text-sm font-semibold px-5 py-3 rounded-full transition-all duration-300 hover:bg-[#182E72] hover:text-white hover:scale-105">
                  Shop Now
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — two infinite marquee rows, opposite directions */}
          {/* FIX 3: Add min-w-0 and overflow-hidden to each marquee container */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full min-h-[420px] min-w-0 w-full max-w-full overflow-hidden">
            {/* FIX 4: Use overflow-hidden and ensure the mask doesn't cause overflow */}
            <div className="marquee-mask relative overflow-hidden flex-1 min-h-0 min-w-0 w-full max-w-full">
              <div className="marquee-track marquee-ltr flex gap-5 h-full w-max transform-gpu">
                {[...marqueeTop, ...marqueeTop].map((product, i) => (
                  <MarqueeCard key={`top-${product.id}-${i}`} product={product} />
                ))}
              </div>
            </div>

            <div className="marquee-mask relative overflow-hidden flex-1 min-h-0 min-w-0 w-full max-w-full">
              <div className="marquee-track marquee-rtl flex gap-5 h-full w-max transform-gpu">
                {[...marqueeBottom, ...marqueeBottom].map((product, i) => (
                  <MarqueeCard key={`bottom-${product.id}-${i}`} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* FIX 5: Mask still works but we also hide overflow on parent */
        .marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          /* Ensure mask doesn't cause overflow */
          mask-composite: add;
          -webkit-mask-composite: add;
        }

        .marquee-track {
          width: max-content;
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          /* FIX 6: Prevent track from affecting document flow */
          position: relative;
        }

        .marquee-ltr {
          animation: marqueeLTR 28s linear infinite;
        }

        .marquee-rtl {
          animation: marqueeRTL 32s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeLTR {
          0% { transform: translateX(-50%) translateZ(0); }
          100% { transform: translateX(0%) translateZ(0); }
        }

        @keyframes marqueeRTL {
          0% { transform: translateX(0%) translateZ(0); }
          100% { transform: translateX(-50%) translateZ(0); }
        }

        .group img {
          will-change: transform;
        }

        /* FIX 7: Hardware acceleration for all animated elements */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* FIX 8: Prevent any child from exceeding parent width */
        .min-w-0 {
          min-width: 0;
        }
      `}</style>
    </section>
  );
};

export default LatestProductSection;