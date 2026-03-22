"use client";
import { Sparkles, BookOpen, UploadCloud } from 'lucide-react';
import { Noto_Sans_Malayalam } from 'next/font/google';

// Initialize the modern sans-serif font
const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

export default function FaqSection() {
  const content = [
    { 
      q: "ഈ പ്ലാറ്റ്ഫോം എങ്ങനെയാണ് പ്രവർത്തിക്കുന്നത്?", 
      a: "നിങ്ങളാണ് ഈ സൈറ്റിന് ജീവൻ നൽകുന്നത്! നിങ്ങൾ അപ്ലോഡ് ചെയ്യുന്ന പഠനരേഖകളാണ് കേരളത്തിലെ ആയിരക്കണക്കിന് വിദ്യാർത്ഥികൾക്ക് ഊർജ്ജമാകുന്നത്.", 
      icon: <Sparkles className="w-6 h-6 text-[#00ED64]" /> 
    },
    { 
      q: "ഡൗൺലോഡ് ചെയ്യുന്നത് തികച്ചും സൗജന്യമാണോ?", 
      a: "അതെ, എക്കാലത്തേക്കും. വിദ്യാഭ്യാസത്തിന് സാമ്പത്തിക അതിരുകൾ ഉണ്ടാകരുത് എന്നാണ് ഞങ്ങൾ വിശ്വസരിക്കുന്നത്.", 
      icon: <BookOpen className="w-6 h-6 text-blue-400" /> 
    },
    { 
      q: "ആർക്കൊക്കെ ഫയലുകൾ പങ്കുവെക്കാം?", 
      a: "ആർക്കും! സ്വന്തം നോട്ടുബുക്കുകൾ പങ്കുവെക്കുന്ന വിദ്യാർത്ഥിയായാലും, വർക്ക്ഷീറ്റുകൾ നൽകുന്ന അധ്യാപകനായാലും, നിങ്ങളുടെ പിന്തുണ വിലപ്പെട്ടതാണ്.", 
      icon: <UploadCloud className="w-6 h-6 text-purple-400" /> 
    }
  ];

  return (
    <section id="how-it-works" className={`w-full max-w-7xl mx-auto py-24 px-6 relative z-10 ${notoSansMalayalam.className}`}>
      {/* Header Area */}
      <div className="flex flex-col mb-12 border-b border-slate-800 pb-6">
        <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00ED64] via-yellow-400 to-[#00ED64] animate-text-gradient">
          എഡ്യൂപ്ലസ് എങ്ങനെയാണ് പ്രവർത്തിക്കുന്നത്?
        </h2>
        <p className="text-slate-400 mt-2 text-lg">
          വിദ്യാർത്ഥികൾക്കായുള്ള ഒരു വലിയ കൂട്ടായ്മ.
        </p>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.map((item, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:border-slate-600 transition-colors group">
            <div className="mb-6 bg-slate-800/50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-4 leading-relaxed">{item.q}</h3>
            <p className="text-slate-400 leading-relaxed text-base">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
