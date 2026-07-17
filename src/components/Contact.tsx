"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { name: "LINKEDIN", url: "https://www.linkedin.com/in/sashank-junnuru-63a4b8395/" },
  { name: "GITHUB", url: "https://github.com/sashank321" },
  { name: "TWITTER", url: "https://twitter.com" },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    // Keep local time updated
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setTimeStr(`${formatted} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      // Large email link — character-by-character reveal
      gsap.fromTo(
        ".contact-headline",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".contact-email",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-email",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-footer-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-footer",
            start: "top 90%",
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full pt-24 pb-12 select-none section-reveal bg-brand-bg relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col min-h-[60vh] justify-between">
        {/* Header */}
        <div className="max-w-[1000px] mt-8 mb-16">
          <div className="contact-headline">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-brand-text-muted uppercase block mb-6">
              04 / Let&apos;s Connect
            </span>
            <h2 className="font-serif text-[7.5vw] md:text-[5vw] lg:text-[4vw] font-light leading-[1.15] tracking-tight text-brand-text mb-12">
              Let&rsquo;s Create Something Exceptional.
            </h2>
          </div>

          {/* Email */}
          <div className="group inline-block contact-email" data-cursor="READ">
            <a
              href="mailto:junnurusasank@gmail.com"
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-extralight text-brand-text hover:opacity-60 transition-opacity duration-500 flex items-center gap-4 py-2 border-b border-brand-text/10"
            >
              junnurusasank@gmail.com
              <span className="inline-block transform transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-1">
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer border-t border-brand-neutral/30 pt-16 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16">
            <div className="md:col-span-6 space-y-4 contact-footer-item">
              <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-[0.2em] uppercase block">
                Channels
              </span>
              <div className="flex items-center space-x-8">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-sans font-semibold tracking-[0.15em] uppercase hover:opacity-60 transition-opacity magnetic-btn"
                    data-cursor="EXPLORE"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-6 md:text-right space-y-2 contact-footer-item">
              <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-[0.2em] uppercase block">
                Local Time
              </span>
              <span className="text-[10px] font-sans font-medium text-brand-text uppercase tracking-widest block tabular-nums">
                {timeStr || "LOADING..."}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-brand-text-muted border-t border-brand-neutral/15 pt-8 contact-footer-item">
            <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase">
              &copy; {currentYear} Sashank. All rights reserved.
            </span>
            <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              Built with precision
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Engineered editorial
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
