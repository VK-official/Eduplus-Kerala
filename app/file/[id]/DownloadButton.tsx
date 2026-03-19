"use client";

import { ExternalLink } from "lucide-react";
import { incrementDownload } from "../../../lib/actions/file.actions";

export function DownloadButton({ fileId, driveUrl }: { fileId: string; driveUrl: string }) {
  const handleDownload = async () => {
    try {
      await incrementDownload(fileId);
    } catch (e) {
      console.error("Failed to increment download count", e);
    }
    window.open(driveUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button 
      onClick={handleDownload}
      className="w-full sm:w-[400px] flex items-center justify-center space-x-3 rounded-xl bg-blue-600 px-8 py-5 text-xl font-bold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    >
      <ExternalLink className="h-7 w-7" />
      <span>Open in Google Drive</span>
    </button>
  );
}
