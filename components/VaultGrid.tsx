"use client";
import { useRef } from "react";
import { FileCard } from "./FileCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EmptyState } from "./EmptyState";

export function VaultGrid({ files }: { files: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (files.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(".file-card-wrapper", {
      y: 80,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: containerRef, dependencies: [files] });

  if (files.length === 0) return <EmptyState />;

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 grid-flow-row-dense auto-rows-min">
      {files.map((file: any, index: number) => {
        const isFeatured = index === 0;
        return (
          <div
            key={file._id}
            className={`file-card-wrapper ${isFeatured ? "md:col-span-2 md:row-span-2 xl:col-span-2 xl:row-span-2" : "col-span-1 xl:col-span-2"}`}
          >
            <FileCard
              id={file._id}
              title={file.title}
              subject={file.subject}
              classNum={file.class}
              type={file.type}
              driveUrl={file.driveUrl}
              featured={isFeatured}
            />
          </div>
        );
      })}
    </div>
  );
}
