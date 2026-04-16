"use client";

import React, { useRef } from "react";
import BackgroundDepth from "@/components/BackgroundDepth";
import Navbar from "@/components/Navbar";
import Pillars from "@/components/Pillars";
import ScrollSections from "@/components/ScrollSections";
import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import Specs from "@/components/Specs";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <BackgroundDepth />
      <Navbar />
      
      {/* Introduction Experience - Free scrub sequence */}
      <div className="relative z-10">
        <ScrollytellingCanvas frameCount={210}>
          {(progressValue: any) => <ScrollSections scrollProgress={progressValue} />}
        </ScrollytellingCanvas>
      </div>

      {/* The Three Pillars Deep Dive */}
      <Pillars />

      {/* Technical Specifications Blueprint */}
      <Specs />

      <footer className="relative z-30 py-12 px-6 text-center bg-[#050505] border-t border-white/5 snap-start">
        <p className="text-white/20 text-xs tracking-widest uppercase">
          R34 Emerald Edition // Designed for the Soul
        </p>
      </footer>
    </main>
  );
}