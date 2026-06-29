"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Prevent scroll during preloader
    document.documentElement.style.overflow = "hidden";

    let currentProgress = 0;
    const duration = 2200; // ms
    const interval = 16; // ~60fps
    const steps = duration / interval;
    const increment = 100 / steps;

    // Eased progress
    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const linear = step / steps;
      const eased = easeInOutQuart(Math.min(linear, 1));
      currentProgress = Math.round(eased * 100);
      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        // Small pause at 100 before exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            document.documentElement.style.overflow = "";
          }, 900);
        }, 300);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const logoLetters = ["F", "O", "R", "W", "A", "R", "D"];
  const logo2Letters = ["S", "T", "U", "D", "I", "O"];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.9,
            ease: cubicBezier(0.76, 0, 0.24, 1),
            delay: isExiting ? 0 : 0,
          }}
        >
          {/* Logo Text */}
          <div className="preloader__logo">
            <div style={{ display: "flex" }}>
              {logoLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.04,
                    ease: cubicBezier(0.19, 1, 0.22, 1),
                  }}
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45, ease: cubicBezier(0.19, 1, 0.22, 1) }}
            >
              <span className="nav__logo-dot" style={{ display: "inline-block" }} />
            </motion.span>
            <div style={{ display: "flex" }}>
              {logo2Letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.04,
                    ease: cubicBezier(0.19, 1, 0.22, 1),
                  }}
                  style={{ display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="preloader__progress-bar"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: cubicBezier(0.19, 1, 0.22, 1) }}
            style={{ transformOrigin: "left" }}
          >
            <motion.div
              className="preloader__progress-fill"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Counter */}
          <motion.span
            className="preloader__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {String(progress).padStart(3, "0")}
          </motion.span>

          {/* Exit curtain sweep */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isExiting ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#050505",
              transformOrigin: "top",
              zIndex: 1,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
