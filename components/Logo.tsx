import Image from "next/image";
import { motion } from "framer-motion";

export const LogoGTR = ({ className = "h-12" }: { className?: string }) => {
  return (
    <div className={`relative group flex items-center gap-4 ${className} min-w-fit`}>
      {/* 
         THE HIGH-END BRANDING CONTAINER
         Optimized via next/image for better caching across Navigation and Loading screens.
      */}
      <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 filter drop-shadow-[0_0_15px_rgba(80,200,120,0.6)] transition-all duration-500 group-hover:scale-110">
        
        {/* The Graphic Logo (High-End Concept 4) */}
        <Image
          src="/logo-abstract.png"
          alt="Nissan Skyline GT-R R34 Logo"
          fill
          sizes="(max-width: 768px) 48px, 64px"
          className="object-contain relative z-10"
          priority
        />

        {/* 
            ULTRA-MINIMALIST GLOW FALLBACK
            Only visible if the image above fails to load (layout placeholder).
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
