"use client";

import { useEffect, useRef } from "react";

const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        const scrollable = scrollHeight - clientHeight;

        if (scrollable > 0 && barRef.current) {
          barRef.current.style.transform = `scaleX(${scrollTop / scrollable})`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-0.5 w-full">
      <div
        ref={barRef}
        className="h-full origin-left bg-black dark:bg-white"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

export default ScrollProgressBar;
