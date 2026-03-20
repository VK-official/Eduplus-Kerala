"use client";
import { ReactNode, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function LiquidGlass({ children, className = "", noHover = false }: { children: ReactNode; className?: string; noHover?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (noHover) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden ${className}`}
      style={{
        background: "rgba(1, 43, 57, 0.5)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.15)",
      }}
    >
      {!noHover && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(0, 237, 100, 0.15),
                rgba(0, 0, 0, 0) 80%
              )
            `,
          }}
        />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
