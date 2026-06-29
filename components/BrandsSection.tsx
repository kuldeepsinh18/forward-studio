"use client";

import { motion, cubicBezier } from "framer-motion";

const brands = [
  "Mahalaxmi Masala",
  "Sikandar Foods",
  "Bhavani Polymers",
  "DTC Still Waters",
  "Tealogy",
  "LIC Campaign",
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: cubicBezier(0.19, 1, 0.22, 1),
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BrandsSection() {
  return (
    <section className="w-full bg-[#050505] text-white py-[80px] lg:py-[140px] px-5 lg:px-[4.5rem] relative overflow-hidden">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] bg-repeat bg-[length:200px_200px]"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col"
        >
          {/* Top Left Label */}
          <motion.div variants={fadeUpVariant} className="mb-12 lg:mb-[60px]">
            <h2 className="text-[12px] lg:text-[14px] font-medium tracking-widest uppercase text-white/40 m-0">
              TRUSTED BY
            </h2>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={fadeUpVariant} className="md:w-3/4 lg:w-2/3 mb-16 lg:mb-24">
            <h3 className="text-[34px] md:text-[48px] lg:text-[60px] font-medium tracking-[-0.02em] leading-[1.1] text-white m-0">
              Trusted by growing brands and ambitious teams.
            </h3>
          </motion.div>

          {/* Brand Grid: Minimal, Text-only, open spacing */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8 lg:gap-y-24 lg:gap-x-12 w-full">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariant}
                className="flex items-center justify-start lg:justify-start"
              >
                <span className="inline-block text-[20px] md:text-[24px] lg:text-[32px] font-medium text-white/25 hover:text-white transition-all duration-[400ms] ease-out hover:scale-[1.03] origin-left cursor-pointer tracking-wide">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
