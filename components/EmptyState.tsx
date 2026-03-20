"use client";

import { motion } from "framer-motion";

export function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 bg-[#012B39] rounded-2xl border border-[#00ED64]/30 shadow-[0_0_20px_rgba(0,237,100,0.1)] text-center min-h-[400px] w-full mx-auto backdrop-blur-md relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ED64]/5 to-[rgba(0,0,0,0)] pointer-events-none"></div>
      <div className="max-w-2xl z-10 flex flex-col items-center justify-center">
        <h3 className="text-3xl font-extrabold tracking-tight text-[#00ED64] mb-4 glow-text uppercase">The Vault is empty.</h3>
        <p className="text-xl text-slate-300 leading-relaxed font-medium">
          Teachers and Students, contribute your resource links to begin!
        </p>
      </div>
    </motion.div>
  );
}
