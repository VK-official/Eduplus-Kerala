"use client";
import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  const submitFeedback = async () => {
    if (!message.trim()) return;
    setStatus('sending');
    const { error } = await supabase.from('platform_feedback').insert([{ message, sender: 'User' }]);
    if (!error) {
      setStatus('success');
      setTimeout(() => { setIsOpen(false); setStatus('idle'); setMessage(''); }, 2000);
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-32 right-6 p-4 bg-slate-900 border border-slate-700 text-slate-300 hover:text-[#00ED64] hover:border-[#00ED64] rounded-full shadow-2xl z-50 transition-all group">
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Report & Feedback</h3>
              <button onClick={() => setIsOpen(false)}><X className="text-slate-500 hover:text-white" /></button>
            </div>
            {status === 'success' ? (
              <div className="p-4 bg-[#00ED64]/10 text-[#00ED64] rounded-lg text-center font-bold">Message Sent. Thank you!</div>
            ) : (
              <>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Found a bug? Have a suggestion? Let us know..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white min-h-[120px] focus:outline-none focus:border-[#00ED64] mb-4" />
                <button onClick={submitFeedback} disabled={status === 'sending'} className="w-full py-3 bg-[#00ED64] text-[#001E2B] font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-[#00ff6e] transition-colors">
                  {status === 'sending' ? 'SENDING...' : <><Send className="w-4 h-4" /> SUBMIT REPORT</>}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
