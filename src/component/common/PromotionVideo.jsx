import React from "react";

const PromotionVideo = () => {
  const videoRef = React.useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };
  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden bg-[#0B1120]">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop={true}
          playsInline
          className="w-full h-full object-cover"
          onEnded={handleVideoEnded}
        >
          <source src="/video/promotion2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60" />
      </div>
    </section>
  );
};

export default PromotionVideo;
