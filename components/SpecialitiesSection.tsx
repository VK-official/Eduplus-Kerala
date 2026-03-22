"use client";
import { CheckCircle2, Search, Globe, ShieldCheck } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '600', '800'], display: 'swap' });

export default function SpecialitiesSection() {
  const specialities = [
    { title: "Teacher-Verified", desc: "Every PDF and link is strictly aligned with the SCERT Kerala syllabus.", icon: <ShieldCheck className="w-8 h-8 text-[#00ED64]" /> },
    { title: "Smart Vault Engine", desc: "Instantly filter thousands of files by class, subject, and medium with zero lag.", icon: <Search className="w-8 h-8 text-[#00ED64]" /> },
    { title: "Bilingual UI", desc: "Seamlessly switch between English and Malayalam to learn in your comfort zone.", icon: <Globe className="w-8 h-8 text-[#00ED64]" /> },
    { title: "100% Free Forever", desc: "No paywalls, no hidden fees, and low-data preview modes to save your internet.", icon: <CheckCircle2 className="w-8 h-8 text-[#00ED64]" /> }
  ];

  return (
    <section className={`w-full max-w-7xl mx-auto py-24 px-6 relative z-10 ${poppins.className}`}>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
          Platform <span className="text-[#00ED64]">Specialities</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Built purely for speed, accuracy, and accessibility.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {specialities.map((spec, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 bg-transparent border-t border-slate-800 pt-8">
            <div className="mb-6 p-4 bg-slate-900/50 rounded-full border border-slate-800">{spec.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{spec.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{spec.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
