"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Database, Book, Users, ShieldCheck } from "lucide-react";

const links = [
  { name: "Home",    href: "/",          icon: Home },
  { name: "Vault",   href: "/vault",     icon: Database },
  { name: "Books",   href: "/books", icon: Book },
  { name: "About",   href: "/about",     icon: Users },
];

export function BottomNav({ isTeacher }: { isTeacher: boolean }) {
  const pathname = usePathname();
  const allLinks = isTeacher ? [...links, { name: "Console", href: "/dashboard", icon: ShieldCheck }] : links;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-[100] flex"
      style={{ x: "-50%" }}
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.4 }}
    >
      <div
        className="flex items-center gap-12 px-8 py-4 rounded-full border border-white/10"
        style={{
          background: "rgba(0, 30, 43, 0.40)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(0,0,0,0.3)",
        }}
      >
        {allLinks.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.href}>
              <motion.div
                whileTap={{ scale: 0.88, y: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative flex flex-col items-center justify-center w-14 h-14 cursor-pointer"
              >
                {/* Framer Motion layoutId Liquid Module — spec-compliant specular pill */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="liquidTab"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        background: "rgba(255, 255, 255, 0.10)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "inset 0 0 15px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.15)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, layout: { duration: 0.35 } }}
                    />
                  )}
                </AnimatePresence>

                <Icon
                  className={`h-6 w-6 transition-colors duration-200 ${active ? "text-[#00ED64] drop-shadow-[0_0_10px_rgba(0,237,100,0.6)]" : "text-slate-400"}`}
                />
                {active && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] font-bold uppercase tracking-widest text-[#00ED64] mt-1 leading-none"
                  >
                    {link.name}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
