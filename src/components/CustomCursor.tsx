"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const textEl = textRef.current;
    if (!cursor || !dot || !textEl) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    setIsVisible(true);

    let hoverTarget: HTMLElement | null = null;
    let isMagnetic = false;

    const onMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (isMagnetic && hoverTarget) {
        const rect = hoverTarget.getBoundingClientRect();
        // Magnetic snap: interpolates position towards the center of the hovered element
        targetX = rect.left + rect.width / 2 + (e.clientX - (rect.left + rect.width / 2)) * 0.2;
        targetY = rect.top + rect.height / 2 + (e.clientY - (rect.top + rect.height / 2)) * 0.2;
      }

      // Outer ring (cursor) follows smoothly (trail effect)
      gsap.to(cursor, {
        x: targetX,
        y: targetY,
        duration: 0.6,
        ease: "power3.out",
      });
      
      // Inner dot follows mouse closely
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        hoverTarget = target as HTMLElement;
        const action = target.getAttribute("data-cursor") || "";
        
        if (action === "CLICK") {
          isMagnetic = true;
          gsap.to(cursor, { scale: 0.5, opacity: 0.2, duration: 0.3 });
          gsap.to(dot, { scale: 3, backgroundColor: "#111111", duration: 0.3 });
        } else {
          setCursorText(action);
          gsap.to(cursor, {
            scale: 5,
            backgroundColor: "#FFFFFF",
            borderColor: "transparent",
            mixBlendMode: "normal", // solid text backdrop
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(dot, { opacity: 0, duration: 0.2 });
          gsap.to(textEl, { opacity: 1, color: "#111111", duration: 0.3 });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        hoverTarget = null;
        isMagnetic = false;
        setCursorText("");
        
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "#111111",
          mixBlendMode: "difference",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
        
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          backgroundColor: "transparent",
          borderColor: "#111111",
          duration: 0.3,
        });

        gsap.to(textEl, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-text pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      >
        <span
          ref={textRef}
          className="absolute text-[5px] font-sans font-bold tracking-[0.25em] uppercase opacity-0 select-none text-center pointer-events-none"
        >
          {cursorText}
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full border border-brand-text pointer-events-none z-[100] mix-blend-difference"
      />
    </>
  );
}
