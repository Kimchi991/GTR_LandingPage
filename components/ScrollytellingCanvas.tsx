"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

interface ScrollytellingCanvasProps {
  frameCount: number;
  children?: (progress: any) => React.ReactNode;
}

const ScrollytellingCanvas: React.FC<ScrollytellingCanvasProps> = ({ frameCount, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // 1. Decoupled Logic - Refs for Lerp
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);

  // 2. Isolation - Focused 500vh scroll
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"],
  });

  // 3. The '3-Phase' Map (Logic only, no spring here to allow manual lerp)
  const mappedFrame = useTransform(
    scrollYProgress, 
    [0, 0.7, 0.95, 1.0], 
    [0, frameCount - 1, 0, 0]
  );

  // Update target frame for the lerp loop
  useMotionValueEvent(mappedFrame, "change", (latestValue) => {
    targetFrameRef.current = Number(latestValue);
  });

  // 4. Performance & Memory - Pre-load Frames (synced with frameCount)
  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
        const totalTarget = frameCount;
        const promises = [];

        for (let i = 1; i <= totalTarget; i++) {
            const paddedIndex = i.toString().padStart(3, "0");
            const src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
            
            promises.push(new Promise<HTMLImageElement | null>((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
                img.onerror = () => {
                    console.error(`Failed to load frame: ${src}`);
                    resolve(null); // Explicitly resolve null to allow consumer skipping
                };
            }));
        }

        const results = await Promise.all(promises);
        
        if (mounted) {
            imagesRef.current = results.filter((img): img is HTMLImageElement => img !== null);
            setImagesLoaded(true);
        }
    };

    loadImages();
    return () => { mounted = false; };
  }, [frameCount]);

  // 5. The Lerp / rAF Loop
  useEffect(() => {
    if (!imagesLoaded) return;

    let rafId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      // 1. Decoupled Physics: Manual Lerp calculation (Lower = Smoother)
      const delta = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += delta * 0.05;

      // Compute the effective frame index once, clamped to valid bounds
      const clampedFrame = Math.max(
        0,
        Math.min(Math.round(currentFrameRef.current), imagesRef.current.length - 1)
      );

      // Only redraw when the effective (clamped) frame index changes
      if (clampedFrame !== lastRenderedFrameRef.current) {
        if (!imagesRef.current.length) return;

        lastRenderedFrameRef.current = clampedFrame;

        const img = imagesRef.current[clampedFrame];
        
        if (img && img.complete && img.width > 0 && canvas) {
            const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

            const displayWidth = canvas.clientWidth || canvas.width;
            const displayHeight = canvas.clientHeight || canvas.height;

            // Sync backing store size with CSS size * devicePixelRatio
            const neededWidth = Math.floor(displayWidth * dpr);
            const neededHeight = Math.floor(displayHeight * dpr);

            if (canvas.width !== neededWidth || canvas.height !== neededHeight) {
              canvas.width = neededWidth;
              canvas.height = neededHeight;
            }

            // Reset transform before scaling
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            ctx.clearRect(0, 0, displayWidth, displayHeight);

            const canvasRatio = displayWidth / displayHeight;
            const imgRatio = img.width / img.height;
            let drawWidth: number;
            let drawHeight: number;
            let offsetX: number;
            let offsetY: number;

            if (canvasRatio > imgRatio) {
              drawWidth = displayWidth;
              drawHeight = displayWidth / imgRatio;
              offsetX = 0;
              offsetY = (displayHeight - drawHeight) / 2;
            } else {
              drawWidth = displayHeight * imgRatio;
              drawHeight = displayHeight;
              offsetX = (displayWidth - drawWidth) / 2;
              offsetY = 0;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(rafId);
  }, [imagesLoaded]);

  // Handle Resize separately: let the render loop manage DPR-aware sizing
  useEffect(() => {
    const handleResize = () => {
      // Intentionally do not set canvas.width/height here to avoid
      // conflicting with the render loop's devicePixelRatio-based sizing.
      // The render loop will catch the dimensions change on the next frame.
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handoff logic
  const canvasOpacity = useTransform(scrollYProgress, [0.95, 1.0], [1, 0]);

  return (
    // 1. THE TRACK (Must be relative and very tall)
    <div id="heritage" ref={introRef} className="relative h-[500vh] w-full bg-[#050505] z-10">
      
      {/* 2. THE CAMERA (Must be sticky, top-0, and screen height) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-20">
        
        {/* Loading Overlay */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-emerald-glow border-t-transparent rounded-full animate-spin mb-4" />
              <span className="text-emerald-glow font-mono tracking-widest animate-pulse">
                RESTORING LEGEND...
              </span>
            </div>
          </div>
        )}

        {/* 3. THE CANVAS (Background Layer - Animated via motion) */}
        <motion.div
           style={{ opacity: canvasOpacity }}
           className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* 4. THE UI (Foreground Layer - Bound to Camera) */}
        <div className="relative z-30 w-full h-full pointer-events-none">
          {imagesLoaded && children && children(scrollYProgress)}
        </div>

      </div>
    </div>
  );
};

export default ScrollytellingCanvas;


