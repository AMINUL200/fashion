import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OurCollection = () => {
  const scrollRef = useRef(null);

  const categories = [
    {
      id: 1,
      title: 'TRENDING JEANS',
      discount: '50–60% OFF',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&auto=format',
      alt: 'Trending Jeans'
    },
    {
      id: 2,
      title: 'MEN\'S FORMAL',
      discount: '40–55% OFF',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop&auto=format',
      alt: 'Men\'s Formal'
    },
    {
      id: 3,
      title: 'WOMEN\'S ETHNIC',
      discount: '45–60% OFF',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop&auto=format',
      alt: 'Women\'s Ethnic'
    },
    {
      id: 4,
      title: 'KIDS WEAR',
      discount: '30–50% OFF',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&h=800&fit=crop&auto=format',
      alt: 'Kids Wear'
    },
    {
      id: 5,
      title: 'ACCESSORIES',
      discount: '30–40% OFF',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop&auto=format',
      alt: 'Accessories'
    },
    {
      id: 6,
      title: 'FOOTWEAR',
      discount: '40–50% OFF',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&auto=format',
      alt: 'Footwear'
    },
    {
      id: 7,
      title: 'SPORTS WEAR',
      discount: '35–45% OFF',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&auto=format',
      alt: 'Sports Wear'
    },
    {
      id: 8,
      title: 'WINTER COLLECTION',
      discount: '40–55% OFF',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop&auto=format',
      alt: 'Winter Collection'
    }
  ];

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 16 : 326;
    el.scrollBy({ left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#FFFFFF] min-h-screen flex flex-col justify-center overflow-x-hidden py-10 lg:py-0">
      <div className="w-full max-w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 lg:justify-center lg:py-10">
        {/* Section Header */}
        <div className="text-center flex-shrink-0">
          <span className="text-[#666666] text-[14px] font-medium tracking-[1px] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            Shop by Category
          </span>
          <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-[#111111] mt-4 tracking-[0.5px]">
            Explore Our Collections
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#B67E00] via-[#D19701] to-[#FFF19C] rounded-full" />
          </div>
          <p className="text-[#777777] text-[18px] font-normal max-w-[600px] mx-auto mt-5 mb-[40px] lg:mb-[50px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Discover our premium collections crafted for every season.
          </p>
        </div>

        {/* Collection Container — fills remaining screen height */}
        <div className="bg-[#FFFFFF] border border-[#D7D7D7] rounded-[8px] p-3 relative flex flex-col flex-1 min-h-[460px]">
          {/* Collection Grid - Horizontal Scroll, stretches to fill available height */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory flex-1 min-h-0"
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative bg-[#FFFFFF] border border-[#D8D8D8] rounded-[8px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] cursor-pointer flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[310px] h-full flex flex-col snap-start"
              >
                {/* Image — flexes to fill card height minus the fixed label bar */}
                <div className="relative overflow-hidden bg-[#F7F7F7] w-full rounded-[6px] flex-1 min-h-0">
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Bottom Label - Gold Gradient — fixed height, sits below the flexed image */}
                <div className="flex-shrink-0 h-[78px] flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-[inset_0_0_30px_rgba(209,151,1,0.1)]" style={{
                  background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                  borderTop: '1px solid #C58C00'
                }}>
                  <span className="text-[#222222] text-[16px] font-semibold uppercase tracking-[0.5px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {category.title}
                  </span>
                  <span className="text-[#111111] text-[22px] font-bold mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {category.discount}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4 mt-6 flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-[54px] h-[54px] rounded-[10px] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(209,151,1,0.35)]"
              style={{
                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                border: '1px solid #C58C00',
                boxShadow: '0 8px 18px rgba(209,151,1,0.28)'
              }}
            >
              <ChevronLeft size={20} color="#5A3A00" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-[54px] h-[54px] rounded-[10px] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(209,151,1,0.35)]"
              style={{
                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                border: '1px solid #C58C00',
                boxShadow: '0 8px 18px rgba(209,151,1,0.28)'
              }}
            >
              <ChevronRight size={20} color="#5A3A00" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        
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

export default OurCollection;