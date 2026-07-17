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
  const [isDark, setIsDark] = useState(false);
  const limelightRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Initial theme check
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }

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
    gsap.fromTo(
      ".nav-container",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 5.5 }
    );

    return () => observer.disconnect();
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
          duration: 0.5,
          ease: "expo.out",
        });
      }
    }
  }, [activeItem]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -100, duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
    setActiveItem(index);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="fixed top-6 right-6 md:right-12 z-40 transition-all duration-500 nav-container opacity-0">
      <nav className="relative inline-flex items-center h-14 rounded-full bg-[#ffffff]/10 dark:bg-[#000000]/40 backdrop-blur-2xl text-brand-text border border-[#ffffff]/20 dark:border-[#ffffff]/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
        {/* Limelight */}
        <div
          ref={limelightRef}
          className="absolute left-0 h-10 top-2 rounded-full bg-brand-text/10 dark:bg-[#ffffff]/10 pointer-events-none"
        />

        <div className="flex items-center px-2">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              ref={el => { navItemRefs.current[index] = el; }}
              href={`#${item.id}`}
              className="relative z-20 flex h-full cursor-pointer items-center justify-center px-5 py-2 font-sans text-[10px] uppercase tracking-widest font-bold"
              onClick={(e) => handleNavClick(e, item.id, index)}
              data-cursor="CLICK"
            >
              {item.label}
            </a>
          ))}

          {/* Theme Toggle Button built into the Navbar */}
          <button
            onClick={toggleTheme}
            className="relative z-20 ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-brand-text/5 hover:bg-brand-text/10 transition-colors duration-300 magnetic-btn"
            data-cursor="CLICK"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              // Sun icon for dark mode
              <svg className="w-4 h-4 text-brand-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              // Moon icon for light mode
              <svg className="w-4 h-4 text-brand-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
