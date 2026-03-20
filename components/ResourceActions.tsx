"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Download, Star } from "lucide-react";
import { addRating } from "../lib/actions/fetch.actions";

interface Props {
  fileId: string;
  viewLink: string;
  downloadLink: string;
  initialRating: number;
  ratingCount: number;
}

export function ResourceActions({ fileId, viewLink, downloadLink, initialRating, ratingCount }: Props) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [ratingMsg, setRatingMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const displayRating = selectedStar || Math.round(initialRating);

  const submitRating = async (stars: number) => {
    if (submitting) return;
    setSelectedStar(stars);
    setSubmitting(true);
    try {
      await addRating(fileId, stars);
      setRatingMsg("Rating submitted! Thank you.");
    } catch (e: any) {
      setRatingMsg(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* View Document */}
        <a
          href={viewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-3 py-5 px-6 rounded-2xl border border-[#00ED64]/25 font-black uppercase tracking-widest text-[#00ED64] text-sm transition-all hover:bg-[#00ED64]/10"
          style={{
            background: "rgba(0,30,43,0.50)",
            backdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
          }}
        >
          <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
          View Document
        </a>

        {/* Direct Download */}
        <a
          href={downloadLink}
          download
          className="group flex items-center justify-center gap-3 py-5 px-6 rounded-2xl font-black uppercase tracking-widest text-[#012B39] text-sm transition-all hover:opacity-90"
          style={{
            background: "#00ED64",
            boxShadow: "0 0 30px rgba(0,237,100,0.35)",
          }}
        >
          <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
          Direct Download
        </a>
      </div>

      {/* Star Rating */}
      <div
        className="p-6 rounded-2xl border border-white/5"
        style={{ background: "rgba(1,43,57,0.40)", backdropFilter: "blur(20px)" }}
      >
        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
          Rate This Resource
          {initialRating > 0 && (
            <span className="ml-3 text-[#00ED64]">
              {initialRating.toFixed(1)} ★ ({ratingCount} {ratingCount === 1 ? "rating" : "ratings"})
            </span>
          )}
        </p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => submitRating(star)}
              disabled={submitting || selectedStar > 0}
              className="transition-transform hover:scale-125 disabled:cursor-not-allowed"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoveredStar || displayRating)
                    ? "text-[#00ED64] fill-[#00ED64]"
                    : "text-slate-700"
                }`}
              />
            </button>
          ))}
        </div>
        <AnimatePresence>
          {ratingMsg && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-bold text-[#00ED64] mt-3 tracking-wide"
            >
              {ratingMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
