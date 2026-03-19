"use client";
import { useRef, useEffect, useState } from "react";
import { BookOpen, PenTool, GraduationCap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

const TICKER = ["SCERT SYLLABUS", "SMART VAULT", "A+ FOCUS", "TEACHER-CURATED"];

export function HeroSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const cardRef       = useRef<HTMLDivElement>(null);
  const icon1         = useRef<HTMLDivElement>(null);
  const icon2         = useRef<HTMLDivElement>(null);
  const icon3         = useRef<HTMLDivElement>(null);

  const [tickIdx, setTickIdx] = useState(0);

  // Y-Axis slot machine cycle
  useEffect(() => {
    const timer = setInterval(() => setTickIdx(i => (i + 1) % TICKER.length), 2400);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Ambient random floating physics
    gsap.to(icon1.current, {
      y: "random(-40,40)", x: "random(-30,30)", rotation: "random(-20,20)",
      duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(icon2.current, {
      y: "random(-40,40)", x: "random(-30,30)", rotation: "random(-20,20)",
      duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(icon3.current, {
      y: "random(-40,40)", x: "random(-30,30)", rotation: "random(-20,20)",
      duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Morphing scroll glass card
    gsap.to(cardRef.current, {
      paddingTop: "1rem", paddingBottom: "1rem",
      borderRadius: "9999px", width: "90%",
      backgroundColor: "rgba(1, 43, 57, 0.02)",
      borderColor: "rgba(0, 237, 100, 0.35)",
      boxShadow: "0 0 50px rgba(0,237,100,0.12), inset 0 0 20px rgba(0,237,100,0.04)",
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=220", scrub: 1.2 },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-[65vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-[#001E2B] pt-20 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#012B39] via-[#001E2B] to-[#001E2B]" />

      {/* Ambient background icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div ref={icon1} className="absolute top-[15%] left-[12%] opacity-[0.18]">
          <BookOpen className="w-28 h-28 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
        </div>
        <div ref={icon2} className="absolute bottom-[18%] right-[12%] opacity-[0.18]">
          <PenTool className="w-36 h-36 text-[#00ED64] drop-shadow-[0_0_20px_rgba(0,237,100,0.4)]" />
        </div>
        <div ref={icon3} className="absolute top-[35%] right-[22%] opacity-[0.15]">
          <GraduationCap className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        <div
          ref={cardRef}
          className="relative w-full rounded-[3rem] p-10 md:p-16 border border-white/5 backdrop-blur-2xl text-center flex flex-col items-center"
          style={{ backgroundColor: "rgba(1, 43, 57, 0.6)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
        >
          {/* Main headline */}
          <h1 className="bg-gradient-to-r from-yellow-400 via-green-400 to-[#00ED64] text-transparent bg-clip-text font-black text-7xl md:text-9xl uppercase leading-none pb-2">
            Eduplus Kerala
          </h1>

          {/* Y-Axis Slot Machine */}
          <div className="h-[44px] overflow-hidden relative flex items-center justify-center w-full mt-5">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={tickIdx}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%",   opacity: 1 }}
                exit={{ y: "-100%",  opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute text-[#00ED64] font-black text-lg md:text-2xl tracking-[0.2em] uppercase"
                style={{ textShadow: "0 0 15px rgba(0,237,100,0.5)" }}
              >
                {TICKER[tickIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
