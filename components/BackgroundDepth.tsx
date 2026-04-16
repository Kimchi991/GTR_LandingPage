"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

const BackgroundDepth = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Smooth the velocity to avoid jittery speedlines
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [-1, 0, 1], [-5, 0, 5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; size: number; speed: number }[] = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      const v = velocityFactor.get();

      particles.forEach((p) => {
        // Starfield effect - subtle emerald glow
        ctx.fillStyle = "rgba(80, 200, 120, 0.3)";
        
        // Draw the particle
        // If moving fast, draw as a line (speedline)
        if (Math.abs(v) > 0.1) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(80, 200, 120, 0.2)";
          ctx.lineWidth = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y - v * 100 * p.speed);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update position (constant drift + scroll velocity)
        p.y += p.speed + v * 50 * p.speed;

        // Reset if out of bounds
        if (p.y > h) p.y = 0;
        if (p.y < 0) p.y = h;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Run once and use .get() for the latest motion values

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
};

export default BackgroundDepth;