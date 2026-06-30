"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Cinematic modal entry: subtle scale + fade + slight Y movement
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Buttery smooth luxury ease out
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    y: 20,
    transition: {
      duration: 0.8,
      ease: [0.7, 0, 0.84, 0],
    }
  }
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.6 }
  }
};

// Item reveal on scroll with fast stagger
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04, // Fast, premium ripple
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1], // Premium easing
    }
  })
};

const allAssets = [
  { type: 'post', num: 1 },
  { type: 'post', num: 2 },
  { type: 'post', num: 3 },
  { type: 'post', num: 4 },
  { type: 'post', num: 5 },
  { type: 'post', num: 6 },
  { type: 'reel', num: 1 },
  { type: 'reel', num: 2 },
];

export function GopalSnacksModal({ isOpen, onClose }: CampaignModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          
          {/* Overlay */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-full bg-[#050505] overflow-y-auto overflow-x-hidden flex flex-col"
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-12 lg:right-12 z-50 mix-blend-difference">
              <button 
                onClick={onClose}
                className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-500 backdrop-blur-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="w-[92vw] max-w-[1700px] mx-auto px-2 md:px-4 lg:px-6 pt-[100px] md:pt-[120px] lg:pt-[160px] pb-24 flex flex-col items-center">
              
              {/* Section 1: Header */}
              <motion.div 
                variants={itemVariants} 
                custom={0}
                initial="hidden"
                animate="visible"
                className="w-full text-center mb-12 md:mb-16 lg:mb-24"
              >
                <h2 className="text-[40px] md:text-[80px] lg:text-[120px] font-bold tracking-tight text-white leading-none mb-3 md:mb-4 lg:mb-6">
                  Gopal Snacks
                </h2>
                <p className="text-[12px] md:text-[14px] lg:text-[18px] text-white/50 tracking-[0.2em] uppercase font-medium">
                  Social Media Campaign
                </p>
              </motion.div>

              {/* Grid Container for all posts and reels */}
              {/* Desktop: 4 columns. Mobile: 2 columns. */}
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 mb-16 lg:mb-32">
                
                {allAssets.map((asset, index) => (
                  <motion.div 
                    key={`${asset.type}-${asset.num}`}
                    custom={index + 1} // +1 so header is 0
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="w-full aspect-[4/5] bg-white/5 rounded-xl overflow-hidden relative transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer z-10 hover:z-20"
                  >
                    {asset.type === 'post' ? (
                      <img 
                        src={`/selected-work/gopal-snacks/post-0${asset.num}.png`} 
                        alt={`Gopal Snacks Post 0${asset.num}`} 
                        className="w-full h-full object-cover"
                        loading={index < 4 ? undefined : "lazy"}
                        // @ts-ignore: React 18 supports fetchPriority but TS might complain depending on version
                        fetchPriority={index < 4 ? "high" : "auto"}
                        decoding={index < 4 ? "sync" : "async"}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 400 500"%3E%3Crect width="400" height="500" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="sans-serif" font-size="16"%3Epost-0${asset.num}.png%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    ) : (
                      <>
                        <video 
                          src={`/selected-work/gopal-snacks/reel-0${asset.num}.mp4`}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center -z-10 bg-[#111]">
                           <span className="text-[#555] font-sans text-xs md:text-base">reel-0{asset.num}.mp4</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
