"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

const TICKER = ["SCERT SYLLABUS", "SMART VAULT", "A+ FOCUS", "TEACHER-CURATED"];

// SVG isometric grid background path
const GRID_PATTERN = `
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
  <g fill="none" stroke="rgba(0,237,100,0.07)" stroke-width="0.5">
    <path d="M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z"/>
    <path d="M40 0 L40 40"/>
    <path d="M0 20 L40 40 L80 20"/>
    <path d="M0 60 L40 40 L80 60"/>
  </g>
</svg>
`.trim();
const GRID_URI = `url("data:image/svg+xml,${encodeURIComponent(GRID_PATTERN)}")`;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);

  const [tickIdx, setTickIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTickIdx(i => (i + 1) % TICKER.length), 2400);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax the isometric grid background on Y-axis as user scrolls
    gsap.to(gridRef.current, {
      backgroundPositionY: "40%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-[#001E2B] pt-24 pb-20">

      {/* SVG Isometric Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: GRID_URI,
          backgroundSize: "80px 80px",
          backgroundPosition: "center 0%",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,30,43,0)_0%,_rgba(0,30,43,0.9)_80%)] z-[1] pointer-events-none" />

      {/* Floating 3D SVGs with Framer Motion */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <FloatingSVG 
          delay={0} 
          className="top-[15%] left-[8%]" 
          color="#00ED64" 
          svg={<rect width="100" height="100" rx="20" transform="rotate(45 50 50)" fill="none" stroke="currentColor" strokeWidth="2" />}
        />
        <FloatingSVG 
          delay={2} 
          className="bottom-[20%] right-[10%]" 
          color="#FFD700" 
          svg={<path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="currentColor" strokeWidth="2" />}
        />
        <FloatingSVG 
          delay={1} 
          className="top-[40%] right-[15%]" 
          color="#FFFFFF" 
          svg={<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />}
        />
        <FloatingSVG 
          delay={3} 
          className="bottom-[15%] left-[18%]" 
          color="#00ED64" 
          svg={
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="20" y="20" width="60" height="60" rx="8" />
              <path d="M20 40 H80 M20 60 H80 M40 20 V80 M60 20 V80" strokeOpacity="0.3" />
            </g>
          }
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="bg-gradient-to-r from-yellow-400 via-green-400 to-[#00ED64] text-[rgba(0,0,0,0)] bg-clip-text font-black text-7xl md:text-9xl uppercase leading-none pb-2">
            Eduplus Kerala
          </h1>

          <div className="h-[44px] overflow-hidden relative flex items-center justify-center w-full mt-5">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={tickIdx}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%",   opacity: 1 }}
                exit={{ y: "-100%",   opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute text-[#00ED64] font-black text-lg md:text-2xl tracking-[0.2em] uppercase"
                style={{ textShadow: "0 0 15px rgba(0,237,100,0.5)" }}
              >
                {TICKER[tickIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FloatingSVG({ delay, className, color, svg }: { delay: number; className: string; color: string; svg: React.ReactNode }) {
  return (
    <motion.div
      className={`absolute ${className} opacity-20`}
      style={{ color }}
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{ 
        y: [0, -40, 0, 40, 0], 
        x: [0, 30, 0, -30, 0],
        rotate: [0, 15, 0, -15, 0]
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <filter id={`glow-${delay}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g filter={`url(#glow-${delay})`}>
          {svg}
        </g>
      </svg>
    </motion.div>
  );
}
