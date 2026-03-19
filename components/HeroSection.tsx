"use client";
import { BookOpen, PenTool, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="relative w-full py-20 lg:py-32 flex flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#012B39]/50 to-bg-atlas-bg">
      {/* Floating Icons Background */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[10%] left-[10%] md:left-[20%] opacity-15"
      >
        <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-white" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] left-[80%] opacity-15"
      >
        <PenTool className="w-32 h-32 md:w-40 md:h-40 text-[#00ED64]" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] right-[15%] md:right-[25%] opacity-15"
      >
        <GraduationCap className="w-20 h-20 md:w-28 md:h-28 text-yellow-400" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="bg-gradient-to-r from-yellow-400 via-green-400 to-[#00ED64] text-transparent bg-clip-text font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight pb-4 drop-shadow-[0_0_20px_rgba(0,237,100,0.3)]">
          Eduplus Kerala
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-slate-300 font-medium max-w-3xl leading-relaxed tracking-wide">
          Premium SCERT academic resources engineered for excellence.
        </p>
      </div>
    </div>
  );
}
