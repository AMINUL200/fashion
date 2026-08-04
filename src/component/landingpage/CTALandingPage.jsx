import React, { useState } from 'react';
import { Mail, Sparkles, Send, CheckCircle2 } from 'lucide-react';

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
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          className="relative bg-[#EEF2FF] rounded-[24px] overflow-hidden"
          style={{ padding: '70px 70px 0px 70px' }}
        >
          {/* Decorative background elements */}
          <div className="absolute top-10 right-16 w-24 h-24 border border-[#182E72]/10 rounded-full" />
          <div className="absolute top-1/3 right-10 w-2 h-2 bg-[#182E72]/30 rounded-full" />
          <div className="absolute bottom-1/4 right-24 w-3 h-3 bg-[#FDBA12]/40 rounded-full" />
          <Sparkles className="absolute top-16 left-[38%] text-[#182E72]/20" size={28} />
          <Sparkles className="absolute bottom-24 right-20 text-[#FDBA12]/50" size={20} />

          <div className="relative flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-4">
            {/* LEFT — Model image, bottom aligned, slight overflow, drop shadow */}
            <div className="relative w-full lg:w-[35%] flex-shrink-0 flex justify-center lg:justify-start order-2 lg:order-1">
              <img
                src="/cta_img.png"
                alt="Fashion model"
                className="relative w-[75%] sm:w-[60%] lg:w-full max-w-[320px] h-auto object-cover object-top"
                style={{
                  marginBottom: '-40px',
                  filter: 'drop-shadow(0 30px 40px rgba(17,24,39,0.25))'
                }}
              />
            </div>

            {/* RIGHT — Heading, description, form */}
            <div className="w-full lg:w-[65%] flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2 pb-[70px]">
              <span className="inline-flex items-center gap-2 text-[#182E72] text-xs uppercase tracking-[0.2em] font-semibold mb-4 bg-white px-3.5 py-1.5 rounded-full border border-[#182E72]/10">
                <Mail size={13} />
                Newsletter
              </span>

              <h2
                className="font-heading text-[#111827] leading-tight max-w-xl"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '42px' }}
              >
                Get The Latest Deals
              </h2>

              <p className="text-[#6B7280] text-base mt-4 max-w-md leading-relaxed">
                Subscribe to receive exclusive offers, new arrivals, and premium fashion updates.
              </p>

              {/* Newsletter Form */}
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg mt-8 flex items-center bg-white rounded-2xl shadow-[0_8px_30px_rgba(17,24,39,0.08)] border border-[#E5E7EB] p-2 pl-5 gap-2"
              >
                <Mail size={18} className="text-[#9CA3AF] flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 flex items-center gap-2 bg-[#182E72] text-white text-sm font-semibold px-5 sm:px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#2848A0] hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span className="hidden sm:inline">Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={15} className="hidden sm:inline" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-[#9CA3AF] text-xs mt-4">
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
      `}</style>
    </section>
  );
};

export default CTALandingPage;