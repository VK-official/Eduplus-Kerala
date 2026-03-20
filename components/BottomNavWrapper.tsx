"use client";

import { BottomNav } from "./BottomNav";

export function BottomNavWrapper() {
  // NextAuth & MongoDB Eradicated - Phase 10
  // Defaulting to guest student view for now.
  const isTeacher = false; 

  return <BottomNav isTeacher={isTeacher} />;
}
