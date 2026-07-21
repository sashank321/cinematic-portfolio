"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const limelightRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    document.documentElement.classList.add("dark");

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = NAV_ITEMS.findIndex((item) => item.id === entry.target.id);
            if (index !== -1) {
              setActiveItem(index);
            }
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Enter animation for nav
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    const enterDelay = hasSeenLoader ? 1.5 : 5.5;

    gsap.fromTo(
      ".nav-container",
      { y: -40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: enterDelay }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const activeEl = navItemRefs.current[activeItem];
    if (activeEl && limelightRef.current) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = activeEl.parentElement?.getBoundingClientRect();

      if (parentRect) {
        gsap.to(limelightRef.current, {
          x: rect.left - parentRect.left,
          width: rect.width,
          duration: 0.6,
          ease: "back.out(1.2)",
        });
      }
    }
  }, [activeItem, isScrolled]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -100, duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
    setActiveItem(index);
  };

  return (
    <div
      className={`fixed right-6 md:right-12 z-40 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] nav-container opacity-0 ${
        isScrolled ? "top-4 scale-95 md:scale-95" : "top-6 scale-100"
      }`}
    >
      <nav
        className={`relative inline-flex items-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border backdrop-blur-3xl text-brand-text h-12 ${
          isScrolled
            ? "bg-[#050505]/60 border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
            : "bg-[#0a0a0a]/30 border-white/[0.03] shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.02)]"
        }`}
      >
        {/* Limelight Spotlight Beam */}
        <div
          ref={limelightRef}
          className="absolute left-0 top-1 bottom-1 rounded-full pointer-events-none transition-all duration-300 opacity-60"
        >
          {/* Top light beam source */}
          <div className="absolute -top-[1px] left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_3px_rgba(255,255,255,0.3)]" />
          {/* Ambient inner spotlight glow */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent border border-white/5 shadow-[0_0_8px_rgba(255,255,255,0.05)]" />
        </div>

        <div className="relative z-20 flex items-center px-2">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeItem === index;
            return (
              <a
                key={item.id}
                ref={(el) => {
                  navItemRefs.current[index] = el;
                }}
                href={`#${item.id}`}
                className={`relative z-20 flex h-full cursor-pointer items-center justify-center transition-colors duration-300 font-sans text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2 ${
                  isActive ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" : "text-brand-text-muted hover:text-white"
                }`}
                onClick={(e) => handleNavClick(e, item.id, index)}
                data-cursor="CLICK"
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
