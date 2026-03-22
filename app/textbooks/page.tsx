"use client";
import { useState } from 'react';
import { ExternalLink, BookText, ShieldCheck } from 'lucide-react';

export default function TextbooksPage() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedMedium, setSelectedMedium] = useState('English');

  const OFFICIAL_LINK = "https://samagra.kite.kerala.gov.in/#/textbook/page";

  return (
    <main className="min-h-screen bg-[#001E2B] text-white pt-32 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">Official <span className="text-[#00ED64]">Textbooks</span></h1>
          <p className="text-slate-400 text-lg">Access the latest SCERT Kerala syllabus books directly from the KITE Samagra portal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00ED64]">
            {['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(cls => <option key={cls} value={cls}>{cls}</option>)}
          </select>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00ED64]">
            {['All Subjects', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Social Science', 'English', 'Malayalam'].map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
          <select value={selectedMedium} onChange={(e) => setSelectedMedium(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00ED64]">
            {['English', 'Malayalam'].map(med => <option key={med} value={med}>{med} Medium</option>)}
          </select>
        </div>

        <div className="mt-8 bg-slate-900/50 border border-[#00ED64]/30 rounded-3xl p-8 md:p-12 text-center relative group hover:border-[#00ED64] transition-colors">
          <div className="w-16 h-16 bg-[#00ED64]/10 rounded-2xl flex items-center justify-center border border-[#00ED64]/30 mb-6 mx-auto">
            <BookText className="w-8 h-8 text-[#00ED64]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{selectedClass} • {selectedSubject} • {selectedMedium}</h2>
          <p className="text-slate-400 mb-8 flex items-center justify-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-400" /> Redirecting to the official Government portal.</p>
          <a href="https://samagra.kite.kerala.gov.in/#/textbook/page" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#00ED64] hover:bg-[#00ff6e] text-[#001E2B] rounded-xl font-black text-lg transition-transform hover:scale-105">ACCESS KITE SAMAGRA <ExternalLink className="w-5 h-5" /></a>
        </div>
      </div>
    </main>
  );
}
