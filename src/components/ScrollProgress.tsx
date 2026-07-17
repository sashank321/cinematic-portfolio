"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[90] pointer-events-none">
      <div
        className="h-full bg-[#0070F3] origin-left transition-transform duration-100 ease-linear shadow-[0_0_8px_rgba(0,112,243,0.5)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
