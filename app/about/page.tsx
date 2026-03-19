"use client";
import { PageWrapper } from "../../components/PageWrapper";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8 glass-card bg-[#012B39]/50 p-12 md:p-20 rounded-[3rem] border border-white/5 backdrop-blur-xl shadow-2xl"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#00ED64] to-[#012B39] py-4">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            To democratize high-quality academic resources for SCERT Kerala students. We build modern, enterprise-grade platforms that empower the next generation of thinkers, innovators, and leaders.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
