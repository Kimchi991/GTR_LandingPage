"use client";

import React from "react";
import { motion } from "framer-motion";

const SpecCard = ({ title, value, detail, icon, className = "" }: { title: string; value: string; detail: string; icon?: string; className?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative group p-8 bg-white/[0.03] backdrop-blur-xl border border-emerald-500/10 rounded-3xl overflow-hidden hover:border-emerald-glow/40 transition-all duration-700 ${className}`}
    >
      {/* Dynamic Glow Background */}
      <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-8">
            <span className="text-emerald-glow text-[10px] font-mono tracking-[0.3em] uppercase opacity-60">{title}</span>
            {icon && <span className="text-white/10 font-mono text-[10px]">{icon}</span>}
          </div>
          
          <h4 className="text-white text-4xl md:text-5xl font-bold mb-4 tracking-tighter group-hover:text-emerald-glow transition-colors duration-500">
            {value}
          </h4>
        </div>
        
        <p className="text-white/30 text-xs font-medium leading-relaxed max-w-[200px] uppercase tracking-wider">
          {detail}
        </p>
      </div>

      {/* Cyber Corner Accents */}
      <div className="absolute top-0 right-0 w-12 h-px bg-gradient-to-l from-emerald-glow/50 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-emerald-glow/50 to-transparent" />
    </motion.div>
  );
};

const Specs = () => {
  return (
    <section id="specs" className="min-h-screen py-48 px-6 md:px-12 bg-[#050505] relative overflow-hidden snap-start flex items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#50C878 1px, transparent 1px), linear-gradient(90deg, #50C878 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <span className="text-emerald-glow font-mono text-xs tracking-[0.8em] uppercase block mb-6 animate-pulse">Data // Verified</span>
          <h2 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase">
            The <span className="text-emerald-glow">Blueprint_</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full auto-rows-[300px]">
          {/* Main Power Spec - Large */}
          <SpecCard 
            title="Max Output"
            value="1200HP"
            detail="SYSTEM UNRESTRICTED / TARGET SYNCED"
            icon="PWR.01"
            className="md:col-span-2 md:row-span-2"
          />

          {/* Torque Spec */}
          <SpecCard 
            title="Torque Range"
            value="1000Nm"
            detail="ACCESSIBLE @ 4200 RPM"
            icon="TRQ.02"
          />

          {/* Engine Spec */}
          <SpecCard 
            title="Block config"
            value="RB26DETT N1"
            detail="REINFORCED CAST IRON CORE"
            icon="ENG.03"
          />

          {/* 0-100 Spec - Wide */}
          <SpecCard 
            title="Velocity Delta"
            value="2.8s (0-100)"
            detail="TRACTION LOGIC OPTIMIZED"
            icon="SPD.04"
            className="md:col-span-3 h-[200px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Specs;
