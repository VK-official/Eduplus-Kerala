"use client";

import { ExternalLink } from "lucide-react";
import { incrementDownload } from "../../../lib/actions/fetch.actions";

export function DownloadButton({ fileId, driveUrl }: { fileId: string; driveUrl: string }) {
  const handleDownload = async () => {
    try {
      // Supabase Patch - Phase 11
      await incrementDownload(fileId);
    } catch (e) {
      console.error("Failed to increment download count", e);
    }
    if (driveUrl) {
      window.open(driveUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button 
      onClick={handleDownload}
      className="w-full sm:w-[400px] flex items-center justify-center space-x-3 rounded-[1.5rem] bg-[#00ED64] px-8 py-5 text-xl font-black text-[#012B39] transition-all hover:bg-[#00ED64]/90 hover:shadow-[0_0_40px_rgba(0,237,100,0.3)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#00ED64] disabled:opacity-50 uppercase tracking-widest"
    >
      <ExternalLink className="h-7 w-7" />
      <span>Secure Download</span>
    </button>
  );
}
