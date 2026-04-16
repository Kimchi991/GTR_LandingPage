"use client";

import React from "react";
import { motion, useTransform } from "framer-motion";

const Section = ({ 
  children, 
  range, 
  align = "center",
  scrollProgress, 
  peak
}: { 
  children: React.ReactNode; 
  range: [number, number]; 
  align?: "left" | "right" | "center" | "hero";
  scrollProgress: any;
  peak?: number;
}) => {
  // Fade in and out logic
  const midPoint = peak ?? (range[0] + range[1]) / 2;
  const opacity = useTransform(
    scrollProgress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [0, 1, 1, 0]
  );
  
  // 3D Scaling - text gets larger as it enters
  const scale = useTransform(
    scrollProgress,
    [range[0], midPoint, range[1]],
    [0.8, 1.1, 0.8]
  );

  // Enhanced parallax for 3D depth
  const y = useTransform(
    scrollProgress,
    [range[0], range[1]],
    [150, -150] 
  );

  const alignmentClasses = {
    hero: "items-center justify-start pt-[12vh] text-center",
    left: "items-start justify-end pb-[10vh] pl-12 md:pl-24 text-left",
    right: "items-end justify-end pb-[10vh] pr-12 md:pr-24 text-right",
    center: "items-center justify-end pb-[10vh] text-center",
  };

  return (
    <motion.div
      style={{ 
        opacity, 
        y, 
        scale, 
        perspective: "1000px" 
      }}
      className={`absolute inset-0 flex flex-col pointer-events-none z-60 ${alignmentClasses[align]}`}
    >
      <div className="max-w-4xl pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
};

const ScrollSections = ({ scrollProgress }: { scrollProgress: any }) => {
  return (
    <>
      {/* 0–15%: HERO */}
      <Section scrollProgress={scrollProgress} range={[0, 0.15]} align="hero">
        <motion.h1 
          className="text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter"
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "-0.02em", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          SKYLINE <span className="text-gradient-emerald">GT-R R34</span>
        </motion.h1>
        <motion.p 
          className="text-white/60 text-xl md:text-2xl font-light tracking-[0.4em] uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          The Legend, Re-imagined.
        </motion.p>
      </Section>

      {/* 15–35%: AERO */}
      <Section scrollProgress={scrollProgress} range={[0.15, 0.35]} align="left">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Sculpted by <br /><span className="text-emerald-glow">Physics.</span>
        </h2>
        <p className="text-white/60 text-lg md:text-2xl leading-relaxed max-w-xl">
          Lightweight carbon composites and active aerodynamics reduce drag while maximizing downforce.
        </p>
      </Section>

      {/* 35–55%: TWIN-TURBO - Synced with engine reveal */}
      <Section scrollProgress={scrollProgress} range={[0.35, 0.55]} align="right">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6">
          The <span className="text-turbo">Twin-Turbo</span> Heart.
        </h2>
        <div className="space-y-4 text-right">
          {[
            "Iconic 2.6L Inline-Six configuration",
            "Symmetrically balanced for instant response",
            "Precision-tuned for the uncompromising"
          ].map((text, i) => (
            <div key={i} className="flex items-center justify-end gap-4">
              <span className="text-white/60 text-lg md:text-xl font-light">{text}</span>
              <div className="w-2 h-2 rounded-full bg-turbo shadow-[0_0_10px_rgba(255,80,0,0.8)]" />
            </div>
          ))}
        </div>
      </Section>

      {/* 55–75%: ATTESA E-TS - Restoration from previous session */}
      <Section scrollProgress={scrollProgress} range={[0.55, 0.75]} align="left">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Total <br /><span className="text-emerald-glow">Traction Control.</span>
        </h2>
        <p className="text-white/60 text-lg md:text-2xl leading-relaxed max-w-xl mb-6">
          Advanced torque vectoring delivers power where it belongs—to the asphalt.
        </p>
        <div className="font-mono text-emerald-glow/40 text-sm tracking-[0.3em] uppercase border-l-2 border-emerald-glow/20 pl-4">
          Real-time intelligent AWD logic <br />
          Keeps you grounded in every corner.
        </div>
      </Section>

      {/* 75–100%: FINAL REVEAL */}
      <Section scrollProgress={scrollProgress} range={[0.75, 1.0]} align="center">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 text-center leading-tight">
          Legacy Restored. <br />
          <span className="text-emerald-glow">Performance Refined.</span>
        </h2>
        <p className="text-white/60 text-lg md:text-xl text-center max-w-2xl mx-auto mb-8">
          The R34 Emerald Edition: Designed for the track, built for the soul.
        </p>
        <div className="flex gap-6 justify-center">
          <button className="px-8 py-4 bg-emerald-glow text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300">
            Configure Your Build
          </button>
          <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors duration-300">
            Technical Specifications
          </button>
        </div>
      </Section>

    </>
  );
};

export default ScrollSections;