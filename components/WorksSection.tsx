"use client";

import { motion, cubicBezier } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const baseWorks = [
  {
    id: 1,
    name: "Mahalaxmi Masala",
    category: "Brand Campaign",
    year: "2026",
  },
  {
    id: 2,
    name: "Bhavani Polymers",
    category: "Product Campaign",
    year: "2026",
  },
  {
    id: 3,
    name: "DTC Still Waters",
    category: "Luxury Real Estate Campaign",
    year: "2026",
  },
  {
    id: 4,
    name: "Sikandar Foods",
    category: "Product Campaign",
    year: "2026",
  },
];

export function WorksSection() {
  const [activeIndex, setActiveIndex] = useState(0); 
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a dynamic sliding window around the active index for true infinite looping
  // This renders only 7 cards at a time, but allows infinite scrolling in both directions
  const visibleWorks = [];
  for (let i = activeIndex - 3; i <= activeIndex + 3; i++) {
    let safeIndex = i % baseWorks.length;
    if (safeIndex < 0) safeIndex += baseWorks.length;
    visibleWorks.push({
      ...baseWorks[safeIndex],
      virtualIndex: i
    });
  }

  // Auto-scroll logic: 1.8s pause + 1.2s slide = 3.0s interval rhythm
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      startAutoPlay();
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 30) {
      setActiveIndex((prev) => prev - 1);
    } else if (info.offset.x < -30) {
      setActiveIndex((prev) => prev + 1);
    }
    startAutoPlay();
  };

  return (
    <section
      id="works"
      className="w-full bg-[#050505] text-white pt-[60px] pb-[100px] lg:pt-[100px] lg:pb-[160px] px-5 lg:px-[4.5rem] overflow-hidden"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col h-full">
        
        {/* Top Header Section - Compact Layout with View All CTA */}
        <div className="z-20 relative flex flex-row justify-between items-end px-5 lg:px-0">
          <h3 className="text-[32px] md:text-[4vw] lg:text-[48px] font-medium tracking-[-0.02em] leading-[1] m-0 text-white">
            Selected Work
          </h3>
          <Link
            href="#all-works"
            className="text-[13px] lg:text-[14px] text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group pb-1 no-underline font-medium"
          >
            View All Work
            <motion.span 
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              →
            </motion.span>
          </Link>
        </div>

        {/* 3D Stacked Carousel Container */}
        {/* Added massive top margin so the cards NEVER overlap or cut the heading */}
        <div className="relative w-full mt-16 lg:mt-24 h-[65vh] lg:h-[75vh] flex items-center justify-center perspective-[1200px]">
          {visibleWorks.map((work) => {
            const offset = work.virtualIndex - activeIndex;
            const absOffset = Math.abs(offset);
            
            // Tighter overlap (70%) ensures side cards stay visible on screen 
            // even with the massive 16:10 cinematic desktop ratio
            const xVal = offset * 85; 
            const scaleVal = 1 - absOffset * 0.08; 
            const opacityVal = absOffset > 2 ? 0 : 1 - absOffset * 0.4;
            const zIndexVal = 10 - absOffset;
            
            const shadowVal = absOffset === 0 
              ? "0 30px 60px rgba(0,0,0,0.8)" 
              : "0 10px 30px rgba(0,0,0,0.6)";

            return (
              <motion.div
                // CRITICAL: use virtualIndex as key so Framer Motion tracks the persistent identity
                key={work.virtualIndex}
                onClick={() => handleCardClick(work.virtualIndex)}
                drag={absOffset === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `${xVal}%`,
                  scale: scaleVal,
                  zIndex: zIndexVal,
                  opacity: opacityVal,
                  boxShadow: shadowVal,
                  rotateY: offset * -20, 
                }}
                transition={{
                  // 1.4s smooth slide as requested
                  duration: 1.4,
                  ease: cubicBezier(0.76, 0, 0.24, 1),
                }}
                className={`
                  absolute
                  w-[85vw] md:w-[600px] lg:w-[850px]
                  aspect-[4/5] md:aspect-[5/4] lg:aspect-[16/10]
                  bg-[#111111]
                  rounded-[24px] lg:rounded-[32px]
                  overflow-hidden
                  transform-gpu
                  ${offset === 0 ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}
                `}
              >
                {/* Visual Image Background Placeholder */}
                <div className="absolute inset-0 bg-[#161616]" />
                
                {/* Dark Depth Overlay for background cards */}
                <motion.div 
                  className="absolute inset-0 bg-black pointer-events-none"
                  animate={{ opacity: absOffset * 0.4 }}
                  transition={{ duration: 1.4, ease: cubicBezier(0.76, 0, 0.24, 1) }}
                />

                {/* Premium Dark Gradient from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Text Overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full p-8 lg:p-12 flex flex-col gap-3 z-10"
                  animate={{ y: absOffset === 0 ? 0 : 20, opacity: absOffset === 0 ? 1 : 0.6 }}
                  transition={{ duration: 1.4, ease: cubicBezier(0.76, 0, 0.24, 1) }}
                >
                  <h4 className="text-[28px] lg:text-[42px] font-medium tracking-[-0.02em] leading-[1.1] m-0 text-white shadow-sm">
                    {work.name}
                  </h4>
                  <div className="text-[14px] lg:text-[16px] text-white/70 font-normal tracking-wide uppercase text-xs">
                    {work.category} • {work.year}
                  </div>
                </motion.div>

                {/* Subtle active border glow */}
                {offset === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.2, duration: 1.4 }}
                    className="absolute inset-0 border border-white/10 rounded-[24px] lg:rounded-[32px] pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
