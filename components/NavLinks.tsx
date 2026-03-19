"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function NavLinks({ isTeacher, mobile = false }: { isTeacher: boolean; mobile?: boolean }) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Class Vault", href: "/vault" },
    { name: "Official Textbooks", href: "/textbooks" },
    { name: "About Us", href: "/about" },
  ];

  if (isTeacher) {
    links.push({ name: "Teacher Console", href: "/dashboard" });
  }

  return (
    <nav className={`flex ${mobile ? 'flex-col gap-4' : 'items-center gap-8'}`}>
      {links.map((link) => {
        const active = pathname === link.href || (pathname === '/' && link.href === '/vault');
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
              active ? "text-[#00ED64]" : "text-slate-300 hover:text-white"
            }`}
          >
            {link.name}
            {active && !mobile && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 -bottom-[16px] h-[3px] w-full bg-[#00ED64] rounded-full"
                style={{ boxShadow: "0 0 15px rgba(0, 237, 100, 0.8)" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
