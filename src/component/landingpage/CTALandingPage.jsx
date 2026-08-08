import React, { useState } from 'react';
import { Mail, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';

const CTALandingPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="bg-[#FFFFFF] py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div 
          className="relative rounded-[14px] overflow-hidden"
          style={{
            height: 'auto',
            minHeight: '500px',
            position: 'relative',
          }}
        >
          {/* Full Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/image/cta.png"
              alt="Luxury fashion background"
              className="w-full h-full object-fill object-center"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20" />
          </div>

          {/* Luxury Background Elements - Golden Textures Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D19701]/10 via-transparent to-[#D19701]/5" />
          
          {/* Soft golden brush strokes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #D19701 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #B67E00 0%, transparent 70%)' }} />
          
          {/* Soft vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
          
          {/* Subtle luxury glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #FFF19C 0%, transparent 70%)' }} />

          {/* Decorative golden sparkles */}
          <Sparkles className="absolute top-[15%] right-[20%] text-[#D19701]/30 hidden sm:block" size={32} />
          <Sparkles className="absolute bottom-[30%] left-[45%] text-[#D19701]/20 hidden sm:block" size={24} />
          <Sparkles className="absolute top-[60%] right-[10%] text-[#D19701]/15 hidden sm:block" size={20} />

          {/* Gold accent gradient line - top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D19701] to-transparent opacity-60" />

          {/* Gold accent gradient line - bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D19701] to-transparent opacity-40" />
          
          <div className="flex flex-col md:flex-row items-center justify-center h-full relative z-10 py-12 md:py-0">
            {/* Empty div - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block w-0 md:w-[200px] lg:w-[300px] xl:w-[350px] flex-shrink-0"></div>
            
            {/* Content Container - Full width on mobile */}
            <div className="relative w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center pt-8 md:pt-20">
              {/* Newsletter Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#111111] text-[12px] sm:text-[14px] font-semibold px-4 sm:px-[18px] py-2 sm:py-[10px] rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-white/50 mb-4 sm:mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Mail size={14} className="text-[#D19701]" />
                Newsletter
              </div>

              {/* Heading */}
              <h2
                className="font-heading text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold text-white leading-[1.2] tracking-[1px] max-w-2xl"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Get The Latest Deals
              </h2>

              {/* Description */}
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-white/90 max-w-[600px] leading-[1.7] mt-3 sm:mt-4 px-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Subscribe to receive exclusive offers, new arrivals, and premium fashion updates.
              </p>

              {/* Email Box */}
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-[520px] mt-4 sm:mt-6 flex items-center bg-white rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#EFE7C8] p-1.5 sm:p-2 gap-1 sm:gap-2"
                style={{ height: '56px' }}
              >
                <Mail size={16} className="text-[#999999] flex-shrink-0 ml-2 sm:ml-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@mail.com"
                  className="flex-1 min-w-0 text-[14px] sm:text-[16px] text-[#111111] placeholder:text-[#999999] outline-none bg-transparent h-full"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 flex items-center gap-1 sm:gap-2 text-[#4D3000] font-semibold px-4 sm:px-[30px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_32px_rgba(209,151,1,0.45)] active:scale-[0.98]"
                  style={{
                    height: '44px',
                    background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                    borderRadius: '10px',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '1px',
                    fontSize: '12px',
                    border: '1px solid #C38A00',
                    boxShadow: '0 12px 24px rgba(209,151,1,0.35)',
                  }}
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span className="hidden sm:inline">SUBSCRIBED</span>
                      <span className="sm:hidden">DONE</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">SUBSCRIBE</span>
                      <span className="sm:hidden">SUB</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Small Text */}
              <p className="text-[10px] sm:text-[12px] text-white/85 mt-2 sm:mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
        }

        /* Prevent horizontal scroll on mobile */
        .overflow-x-hidden {
          overflow-x: hidden;
        }

        /* Ensure container doesn't overflow */
        .max-w-\\[1400px\\] {
          max-width: 1400px;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .rounded-\\[14px\\] {
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default CTALandingPage;