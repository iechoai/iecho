"use client";

import { useEffect, useRef } from "react";

export function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Convert mouse position to percentage
        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;

        // Update mask position
        gridRef.current.style.maskPosition = `${xPercent}% ${yPercent}%`;
        gridRef.current.style.webkitMaskPosition = `${xPercent}% ${yPercent}%`;
      }
    };

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Interactive Grid Background */}
      <div
        ref={gridRef}
        className="grid-container fixed inset-0 pointer-events-none z-0"
      ></div>

      {/* Static Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0F5F66]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#B6FF3D]/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </>
  );
}
