import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const allSlides = [
    {
      id: 1,
      title: 'Summer Collection 2026',
      subtitle: 'Discover timeless style crafted for modern men & women.',
      buttonText: 'Shop Now',
      image: '/image/hero/hero5.jpeg',
      bgColor: 'from-[#182E72] to-[#2848A0]',
      textColor: 'text-white',
      badge: 'New Arrival',
      badgeColor: 'bg-[#16A34A]'
    },
    {
      id: 2,
      title: 'Men\'s Premium Collection',
      subtitle: 'Elevate your wardrobe with timeless elegance and sophistication.',
      buttonText: 'Explore Men',
      image: '/image/hero/hero7.jpeg',
      bgColor: 'from-[#1A1A2E] to-[#16213E]',
      textColor: 'text-white',
      badge: 'Premium',
      badgeColor: 'bg-[#182E72]'
    },
    {
      id: 3,
      image: '/image/hero/hero3.jpeg',
    },
    {
      id: 4,
      image: '/image/hero/hero9.jpeg',
    }
  ];

  const slides = allSlides.map(slide => ({
    ...slide,
    isImageOnly: !slide.title && !slide.subtitle && !slide.buttonText,
    bgColor: slide.bgColor || 'from-[#182E72] to-[#2848A0]',
    textColor: slide.textColor || 'text-white',
    badge: slide.badge || null,
    badgeColor: slide.badgeColor || 'bg-[#182E72]'
  }));

  const validSlides = slides.filter(slide => slide.image);

  const finalSlides = validSlides.length > 0 ? validSlides : [
    {
      id: 'fallback-1',
      title: 'Welcome to Our Store',
      subtitle: 'Discover our latest collection of premium fashion.',
      buttonText: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&h=600&fit=crop',
      bgColor: 'from-[#182E72] to-[#2848A0]',
      textColor: 'text-white',
      badge: 'Featured',
      badgeColor: 'bg-[#182E72]',
      isImageOnly: false
    }
  ];

  useEffect(() => {
    if (finalSlides.length <= 1) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating || finalSlides.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % finalSlides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating || finalSlides.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + finalSlides.length) % finalSlides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide || finalSlides.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (finalSlides.length === 0) {
    return null;
  }

  return (
    // FIX 1: Add overflow-x-hidden to prevent horizontal scroll
    <section className="relative w-full max-w-full overflow-x-hidden overflow-y-visible bg-[#F8FAFC]">
      {/* Slides Container — overflow-hidden prevents scaling from causing overflow */}
      <div className="relative w-full max-w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {finalSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              // FIX 2: Use translateX(-50%) with transform-origin to prevent overflow
              transform: index === currentSlide 
                ? 'translateX(0) scale(1) translateZ(0)' 
                : 'translateX(0) scale(1.05) translateZ(0)',
              transition: 'opacity 700ms ease-in-out, transform 700ms ease-in-out',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              // FIX 3: Ensure transforms don't cause overflow
              transformOrigin: 'center center',
              // FIX 4: Prevent element from affecting layout width
              maxWidth: '100%'
            }}
          >
            {/* Background Image with optional Gradient Overlay */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title || 'Hero banner'}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&h=600&fit=crop';
                }}
              />
              {!slide.isImageOnly && (
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-50`} />
              )}
            </div>

            {/* Content — Only show if slide has text content */}
            {!slide.isImageOnly ? (
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl">
                  {slide.badge && (
                    <div className="mb-4">
                      <span className={`inline-block ${slide.badgeColor} text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider`}>
                        {slide.badge}
                      </span>
                    </div>
                  )}

                  {slide.title && (
                    <h1 className={`font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold ${slide.textColor} mb-4 leading-tight`}>
                      {slide.title}
                    </h1>
                  )}

                  {slide.subtitle && (
                    <p className={`text-base sm:text-lg lg:text-xl ${slide.textColor} opacity-90 mb-8 max-w-lg leading-relaxed`}>
                      {slide.subtitle}
                    </p>
                  )}

                  {slide.buttonText && (
                    <button className="group flex items-center gap-3 bg-white text-[#182E72] px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:bg-[#182E72] hover:text-white hover:shadow-xl hover:scale-105 active:scale-95">
                      <span>{slide.buttonText}</span>
                      <ShoppingBag size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-black/10" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {finalSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {finalSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {finalSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-10 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {finalSlides.length > 1 && (
        <div className="absolute bottom-8 right-8 text-white/70 text-sm font-medium z-20 hidden sm:block">
          {String(currentSlide + 1).padStart(2, '0')} / {String(finalSlides.length).padStart(2, '0')}
        </div>
      )}

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        /* FIX 5: Hardware acceleration for all animated elements */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* FIX 6: Prevent any child from exceeding parent width */
        .min-w-0 {
          min-width: 0;
        }

        /* FIX 7: Ensure slides don't overflow */
        .absolute.inset-0 {
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;