import React, { useState, useEffect, useCallback } from 'react';
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
      title: "Men's Premium Collection",
      subtitle: 'Elevate your wardrobe with timeless elegance and sophistication.',
      buttonText: 'Explore Men',
      image: '/image/hero/hero7.jpeg',
      bgColor: 'from-[#1A1A2E] to-[#16213E]',
      textColor: 'text-white',
      badge: 'Premium',
      badgeColor: 'bg-[#182E72]'
    },
    { id: 3, image: '/image/hero/hero3.jpeg' },
    { id: 4, image: '/image/hero/hero9.jpeg' }
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

  const total = finalSlides.length;

  const nextSlide = useCallback(() => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, total]);

  const prevSlide = () => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide || total <= 1) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, total]);

  if (total === 0) return null;

  return (
    <section className="hero-clip relative w-full bg-[#F8FAFC]">
      {/* Slides Container — the ONLY element with a defined height; every transform lives inside it */}
      <div className="hero-clip relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
        {finalSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className="absolute inset-0"
              style={{ opacity: isActive ? 1 : 0, transition: 'opacity 700ms ease-in-out' }}
              aria-hidden={!isActive}
            >
              {/* Image layer — fixed box (inset-0), overflow-hidden, ONLY the <img> inside scales.
                  Scaling a static-size box's content can never enlarge that box's own
                  layout footprint, so it cannot create scrollable overflow. */}
              <div className="hero-clip absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title || 'Hero banner'}
                  className="hero-slide-img w-full h-full object-cover"
                  style={{ transform: isActive ? 'scale(1.06)' : 'scale(1)' }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&h=600&fit=crop';
                  }}
                />
                {!slide.isImageOnly && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-50`} />
                )}
              </div>

              {/* Content layer — no transforms here at all */}
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
                <div className="absolute inset-0 bg-black/10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} className="text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={22} className="text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {total > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 sm:gap-3 z-20">
          {finalSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white' : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {total > 1 && (
        <div className="absolute bottom-8 right-8 text-white/70 text-sm font-medium z-20 hidden sm:block">
          {String(currentSlide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      )}

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        /* Single, deliberate clip rule reused on every level that has a transform
           descendant — this is the entire fix. No inline-style transforms anywhere
           on a box whose size comes from anything other than absolute inset-0. */
        .hero-clip {
          overflow: hidden;
          max-width: 100%;
        }

        /* The ONLY element that ever receives a transform. It's a plain <img> with
           w-full h-full inside an overflow-hidden, fixed-size (inset-0) parent —
           scaling it can visually zoom the picture but can never change the box's
           own dimensions, so it cannot contribute to document.scrollWidth. */
        .hero-slide-img {
          display: block;
          transition: transform 6000ms ease-out;
          transform-origin: center center;
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;