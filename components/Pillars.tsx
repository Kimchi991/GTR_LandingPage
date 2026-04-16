"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import useSound from "use-sound";

const DataLeak = () => {
  return (
    <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex justify-between px-4 overflow-hidden">
      {[...Array(2)].map((_, side) => (
        <div key={side} className="flex flex-col opacity-40">
          {[...Array(40)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
              className="text-emerald-glow text-[10px] font-mono leading-none mb-1"
            >
              {Math.floor(Math.random() * 90000 + 10000)}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

const HeartPillar = () => {
  const [isGlitched, setIsGlitched] = useState(false);
  const [isRevving, setIsRevving] = useState(false);
  const controls = useAnimation();
  
  const [play, { stop }] = useSound("/sounds/rev.mp3", { 
    volume: 0.7,
    onend: () => {
      setIsRevving(false);
      setIsGlitched(false);
    }
  });

  const handleRev = async () => {
    if (isRevving) {
      stop();
      controls.stop();
      // Snap back to original position
      await controls.start({ x: 0, rotate: 0, transition: { duration: 0.1 } });
      setIsRevving(false);
      setIsGlitched(false);
      return;
    }

    setIsRevving(true);
    setIsGlitched(true);
    play();
    
    await controls.start({
      x: [0, -10, 15, -15, 10, -5, 0],
      rotate: [0, -1, 1, -1, 1, 0],
      transition: { duration: 0.3, ease: "easeInOut" }
    });
    
    // We keep isRevving/isGlitched true if the sound is still playing 
    // unless the sound is very short. If it's short, onend handles it.
  };

  return (
    <section id="heart" className="h-screen w-full relative flex items-center justify-center bg-[#050505] snap-start overflow-hidden">
      {/* 
        NEW: Static Wrapper (The "Glass Shelf")
        This stays perfectly still so the button doesn't drift.
      */}
      <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
        
        {/* Shaking Engine Box */}
        <motion.div 
          animate={controls}
          className="absolute inset-0"
          style={{
            filter: isGlitched ? "brightness(2) saturate(1.5) contrast(1.2)" : "none"
          }}
        >
          <Image 
            src="/Pillars/1stP.png" 
            alt="The Heart - Engine" 
            fill 
            className="object-contain"
            priority
          />
          {isGlitched && <DataLeak />}
        </motion.div>
        
        {/* 
          STABLE ANCHOR: Non-motion wrapper.
          This tells the browser: "The button's center is absolute and NEVER moves."
        */}
        <div className="absolute bottom-[20%] left-[49%] -translate-x-1/2 w-64 h-32 z-30 pointer-events-none">
          <motion.button
            onClick={handleRev}
            className="w-full h-full cursor-pointer group opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-auto"
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulse Effect */}
            <div className="absolute inset-0 bg-emerald-glow/5 rounded-full animate-pulse blur-xl" />
            
            <div className="w-full h-full border border-emerald-glow/20 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md">
              <span className="text-emerald-glow text-[10px] tracking-[0.8em] uppercase font-mono">INITIATE REV</span>
            </div>
          </motion.button>
        </div>

        {/* Glitch UI - Also isolated from engine shake for readability */}
        <AnimatePresence>
          {isGlitched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, letterSpacing: "1em" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "-0.02em" }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <h2 className="text-emerald-glow text-5xl md:text-8xl font-black italic tracking-tighter drop-shadow-[0_0_20px_rgba(80,200,120,1)] text-center">
                SYSTEM UNRESTRICTED<br/>
                <span className="text-white text-4xl md:text-6xl font-mono">1200HP_SYNCED</span>
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute top-12 left-12">
        <span className="text-emerald-glow/40 text-sm tracking-widest uppercase font-mono">Pillar 01 / RB26DETT</span>
        <h3 className="text-white text-4xl font-bold">THE HEART</h3>
      </div>
    </section>
  );
};

const BrainPillar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const dashOffset = useTransform(scrollYProgress, [0.1, 0.9], [1500, -1500]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="brain" className="h-screen w-full relative flex items-center justify-center bg-[#050505] snap-start overflow-hidden">
      <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
        <Image 
          src="/Pillars/2ndP.png" 
          alt="The Brain - Drivetrain" 
          fill 
          className="object-contain"
          priority
        />
        
        {/* SVG Power Flow Overlay - Neon Pulse */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#50C878" stopOpacity="0" />
              <stop offset="50%" stopColor="#50C878" stopOpacity="1" />
              <stop offset="100%" stopColor="#50C878" stopOpacity="0" />
            </linearGradient>
            <filter id="neon-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Static Path Shadow */}
          <path
            d="M500,750 L500,450 M500,450 L350,300 M500,450 L650,300"
            fill="none"
            stroke="#50C878"
            strokeWidth="4"
            strokeOpacity="0.1"
            strokeLinecap="round"
          />

          {/* Animating Pulse Line */}
          <motion.path
            d="M500,750 L500,450 M500,450 L350,300 M500,450 L650,300" 
            fill="none"
            stroke="url(#pulse-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="200 400"
            filter="url(#neon-glow)"
            style={{ 
              strokeDashoffset: dashOffset,
              opacity 
            }}
          />
        </svg>
      </div>

      <div className="absolute top-12 right-12 text-right">
        <span className="text-turbo/40 text-sm tracking-widest uppercase font-mono">Pillar 02 / ATTESA E-TS</span>
        <h3 className="text-white text-4xl font-bold">THE BRAIN</h3>
      </div>
    </section>
  );
};

const SoulPillar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const updatePos = (x: number, y: number, target: HTMLElement) => {
    const { left, top } = target.getBoundingClientRect();
    setMousePos({ x: x - left, y: y - top });
  };

  const handleMouseMove = (e: React.MouseEvent) => updatePos(e.clientX, e.clientY, e.currentTarget as HTMLElement);
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    updatePos(touch.clientX, touch.clientY, e.currentTarget as HTMLElement);
  };

  return (
    <section 
      id="soul" 
      className="h-screen w-full relative bg-[#050505] snap-start overflow-hidden sm:cursor-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image 
          src="/Pillars/3rdP.png" 
          alt="The Soul - Z-Tune" 
          fill 
          className="object-contain"
          priority
        />
        
        <motion.div 
          className="absolute inset-0 bg-[#050505] pointer-events-none"
          style={{
            maskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
          }}
        />

        <div className="absolute bottom-12 left-12">
            <span className="text-white/20 text-sm tracking-widest uppercase font-mono">Pillar 03 / Z-TUNE</span>
            <h3 className="text-white text-4xl font-bold">THE SOUL</h3>
        </div>
      </div>
    </section>
  );
};

const Pillars = () => {
  return (
    <div className="relative z-50">
      <HeartPillar />
      <BrainPillar />
      <SoulPillar />
    </div>
  );
};

export default Pillars;
