import React from "react";
import { motion } from "framer-motion";

export const LogoGTR = ({ className = "h-12" }: { className?: string }) => {
  return (
    <div className={`relative group flex items-center gap-4 ${className} min-w-fit`}>
      {/* 
         THE HIGH-END BRANDING CONTAINER
         Simple <img> to bypass Next.js optimization delays for new public assets.
      */}
      <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 filter drop-shadow-[0_0_15px_rgba(80,200,120,0.6)] transition-all duration-500 group-hover:scale-110">
        
        {/* The Graphic Logo (High-End Concept 4) */}
        <img
          src="/logo-abstract.png"
          alt="GT-R R34"
          className="w-full h-full object-contain relative z-10"
          onError={(e) => {
            // If the image fails, hidden fallback styling triggers
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* 
            ULTRA-MINIMALIST GLOW FALLBACK
            Only visible if the image above is missing or fails.
        */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
           <div className="w-8 h-8 border-t-2 border-emerald-glow rounded-full animate-spin-slow" />
        </div>
      </div>

      {/* Branded Text Part */}
      <div className="flex flex-col justify-center">
          <motion.span 
            className="text-white font-bold text-2xl tracking-tighter leading-none"
          >
            GT-R
          </motion.span>
          <motion.span 
            className="text-emerald-glow text-[9px] font-mono tracking-[0.6em] uppercase border-t border-emerald-glow/20 mt-1 pt-1"
          >
            Emerald_Edition
          </motion.span>
      </div>
    </div>
  );
};
