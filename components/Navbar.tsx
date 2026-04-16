"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between ${
        scrolled ? "glass-nav py-3" : "bg-transparent"
      }`}
    >
      {/* Left: Logo */}
      <div className="text-white font-semibold text-xl tracking-tight">
        GT-R <span className="text-emerald-glow">R34</span>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex items-center space-x-8 text-white/60 text-sm font-medium">
        {["Heritage", "Heart", "Brain", "Soul", "Specs"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="hover:text-white transition-colors duration-300 relative group"
          >
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-glow transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Right: CTA */}
      <div>
        <button className="relative group overflow-hidden px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold transition-all duration-300 hover:border-emerald-glow/50">
          <span className="relative z-10">Experience the Icon</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-glow to-turbo opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
