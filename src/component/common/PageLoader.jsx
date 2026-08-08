import React, { useEffect, useState } from 'react';

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000; // 3 seconds for a more premium feel
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          // Loader complete - you can add navigation logic here
        }, 500);
      }
    };
    
    requestAnimationFrame(animateProgress);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFFFFF]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft golden glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-30" 
          style={{ background: 'radial-gradient(circle, #D19701 0%, transparent 70%)' }} />
        
        {/* Secondary glow */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15" 
          style={{ background: 'radial-gradient(circle, #FFF19C 0%, transparent 70%)' }} />
        
        {/* Decorative circles with animation */}
        <div className="absolute top-10 right-20 w-32 h-32 border border-[#D19701]/10 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-[#D19701]/10 rounded-full animate-pulse-slow-delay" />
        <div className="absolute top-1/2 right-10 w-16 h-16 border border-[#D19701]/10 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-20 w-20 h-20 border border-[#D19701]/5 rounded-full animate-pulse-slow-delay" />
        
        {/* Floating sparkles */}
        <div className="absolute top-[15%] right-[30%] animate-float-slow">
          <div className="w-1 h-1 bg-[#D19701]/40 rounded-full shadow-lg shadow-[#D19701]/20" />
        </div>
        <div className="absolute bottom-[25%] left-[20%] animate-float-slow-delay">
          <div className="w-1.5 h-1.5 bg-[#D19701]/30 rounded-full shadow-lg shadow-[#D19701]/20" />
        </div>
        <div className="absolute top-[60%] right-[15%] animate-float-slow">
          <div className="w-1 h-1 bg-[#D19701]/35 rounded-full shadow-lg shadow-[#D19701]/20" />
        </div>
        <div className="absolute top-[30%] left-[10%] animate-float-slow-delay">
          <div className="w-2 h-2 bg-[#FFF19C]/20 rounded-full" />
        </div>
        <div className="absolute bottom-[40%] right-[25%] animate-float-slow">
          <div className="w-1.5 h-1.5 bg-[#D19701]/25 rounded-full" />
        </div>

        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #D19701 0px, #D19701 1px, transparent 1px, transparent 20px)',
            backgroundSize: '28px 28px'
          }} 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Logo Animation - Enhanced */}
        <div className="relative mb-10">
          {/* Outer ring with glow */}
          <div className="w-32 h-32 rounded-full border-2 border-[#EFE7C8] flex items-center justify-center relative shadow-xl shadow-[#D19701]/5">
            {/* Rotating ring - outer */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D19701] border-r-[#D19701] animate-spin-slow" />
            
            {/* Rotating ring - inner reverse */}
            <div className="absolute inset-[4px] rounded-full border-2 border-transparent border-b-[#D19701] border-l-[#D19701] animate-spin-reverse" />
            
            {/* Middle ring */}
            <div className="absolute inset-[10px] rounded-full border border-[#EFE7C8]/30" />
            
            {/* Pulsing glow behind brand initial */}
            <div className="absolute inset-0 rounded-full bg-[#D19701]/5 animate-pulse-glow" />
            
            {/* Brand initial with gradient */}
            <span className="font-heading text-5xl font-bold bg-gradient-to-br from-[#B67E00] via-[#D19701] to-[#FFF19C] bg-clip-text text-transparent animate-text-shimmer">
              A
            </span>
          </div>
          
          {/* Gold accent dot with pulse */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#D19701] shadow-lg shadow-[#D19701]/40 animate-pulse-dot">
            <div className="absolute inset-0 rounded-full bg-[#D19701] animate-ping opacity-30" />
          </div>
          
          {/* Additional decorative dots */}
          <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[#FFF19C] shadow-lg shadow-[#D19701]/20" />
          <div className="absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-[#D19701]/30" />
        </div>

        {/* Brand Name - Enhanced */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-[#111111] tracking-[4px] relative">
            APSARA
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D19701] to-transparent animate-line-expand" />
          </h1>
          <p className="text-[#666666] text-xs tracking-[6px] uppercase mt-3 font-light" 
             style={{ fontFamily: "'Inter', sans-serif" }}>
            Luxury Women's Fashion
          </p>
        </div>

        {/* Loading Text with Enhanced Animated Dots */}
        <div className="mt-12 flex items-center">
          <span className="text-[12px] text-[#666666] tracking-[4px] uppercase font-medium" 
                style={{ fontFamily: "'Inter', sans-serif" }}>
            Loading
          </span>
          <span className="flex items-center gap-1.5 ml-2">
            <span className={`w-2 h-2 rounded-full bg-[#D19701] transition-all duration-300 ${
              progress > 0 ? 'opacity-100 animate-dot' : 'opacity-20'
            }`} />
            <span className={`w-2 h-2 rounded-full bg-[#D19701] transition-all duration-300 ${
              progress > 33 ? 'opacity-100 animate-dot' : 'opacity-20'
            }`} />
            <span className={`w-2 h-2 rounded-full bg-[#D19701] transition-all duration-300 ${
              progress > 66 ? 'opacity-100 animate-dot' : 'opacity-20'
            }`} />
          </span>
        </div>

        {/* Decorative line with animation */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D19701] to-transparent animate-line-pulse" />
        
        
      </div>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.1);
          }
        }

        @keyframes float-slow-delay {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }

        @keyframes dot-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slow-delay {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.08);
          }
        }

        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes line-expand {
          from {
            width: 0%;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes line-pulse {
          0%, 100% {
            opacity: 0.3;
            width: 16px;
          }
          50% {
            opacity: 0.8;
            width: 32px;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }

        .animate-float-slow {
          animation: float-slow 4.5s ease-in-out infinite;
        }

        .animate-float-slow-delay {
          animation: float-slow-delay 4s ease-in-out infinite 0.5s;
        }

        .animate-dot {
          animation: dot-pulse 1.4s ease-in-out infinite;
        }

        .animate-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .animate-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .animate-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 4.5s ease-in-out infinite 0.5s;
        }

        .animate-pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s ease-in-out infinite;
        }

        .animate-line-expand {
          animation: line-expand 1.5s ease-out forwards;
        }

        .animate-line-pulse {
          animation: line-pulse 2s ease-in-out infinite;
        }

        /* Fade out animation when complete */
        .loader-fade-out {
          animation: fadeOut 0.6s ease-out forwards;
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;