"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import ParticleText from "./ParticleText";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const heroRevealRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const rolesContainerRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const percentageValueRef = useRef<HTMLSpanElement>(null);

  const [particleFontSize, setParticleFontSize] = useState(140);

  useEffect(() => {
    setParticleFontSize(window.innerWidth < 768 ? 60 : 140);
  }, []);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.stop();
    document.documentElement.style.overflow = "hidden";

    const roleEls = rolesContainerRef.current?.querySelectorAll(".role-line");
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        if (lenis) lenis.start();
      },
    });

    // ─── PHASE 1: Black screen (0.4s) ───
    tl.to({}, { duration: 0.4 });

    // ─── PHASE 2: Particle text "SASHANK" fades in ───
    tl.to(particleContainerRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    // Hold for interaction
    tl.to({}, { duration: 1.5 });

    // ─── PHASE 3: Particles fade out, roles cycle ───
    tl.to(particleContainerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    });

    // Show roles container
    tl.set(rolesContainerRef.current, { opacity: 1 });

    // Cycle through each role line
    if (roleEls) {
      roleEls.forEach((el, idx) => {
        tl.fromTo(
          el,
          { opacity: 0, y: 20, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
        );
        tl.to({}, { duration: 0.25 });
        tl.to(el, {
          opacity: 0,
          y: -15,
          filter: "blur(4px)",
          duration: 0.3,
          ease: "power2.in",
        });
      });
    }

    // ─── PHASE 4: Loading percentage ───
    tl.set(percentageRef.current, { opacity: 1 });
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: function () {
          if (percentageValueRef.current) {
            percentageValueRef.current.textContent = String(
              Math.round(this.targets()[0].val)
            ).padStart(3, "0");
          }
        },
      }
    );

    tl.to(percentageRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    // ─── PHASE 5: Loader fades, hero clip-path expands ───
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Clip-path reveal
    tl.set(heroRevealRef.current, { display: "block" });
    tl.fromTo(
      heroRevealRef.current,
      { clipPath: "circle(0% at 50% 50%)" },
      {
        clipPath: "circle(100% at 50% 50%)",
        duration: 1.8,
        ease: "power4.inOut",
      },
      "-=0.5"
    );

    // Headline lines
    tl.fromTo(
      ".hero-line-inner",
      { y: "120%", rotateZ: 3 },
      {
        y: "0%",
        rotateZ: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: "power4.out",
      },
      "-=1.2"
    );

    // Role tags
    tl.fromTo(
      ".hero-role-tag",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" },
      "-=0.8"
    );

    // Subtitle
    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Remove loader
    tl.set(loaderRef.current, { display: "none" });
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden select-none"
    >
      {/* ═══ CINEMATIC LOADER ═══ */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#000000]"
      >
        {/* Particle Text */}
        <div
          ref={particleContainerRef}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-auto"
        >
          <ParticleText
            text="SASHANK"
            fontSize={particleFontSize}
            fontWeight="300"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            particleColor="#FFFFFF"
            particleSize={1.2}
            particleDensity={3}
            mouseRadius={100}
            returnSpeed={0.04}
            backgroundColor="transparent"
            className="w-full h-full"
          />
        </div>

        {/* Role Lines (all rendered but hidden via opacity) */}
        <div ref={rolesContainerRef} className="flex flex-col items-center justify-center absolute opacity-0">
          <span className="role-line font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-white/80 font-light absolute opacity-0">
            Software Engineering
          </span>
          <span className="role-line font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-white/80 font-light absolute opacity-0">
            Design
          </span>
          <span className="role-line font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-white/80 font-light absolute opacity-0">
            Machine Learning
          </span>
        </div>

        {/* Percentage */}
        <div ref={percentageRef} className="flex flex-col items-center opacity-0 absolute">
          <span
            ref={percentageValueRef}
            className="font-sans text-6xl md:text-8xl font-extralight tracking-wider text-white tabular-nums"
          >
            000
          </span>
        </div>
      </div>

      {/* ═══ HERO CONTENT ═══ */}
      <div ref={heroRevealRef} className="absolute inset-0 w-full h-full hidden">
        <div className="w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center pt-16">
          <div className="max-w-[1100px] mt-12 md:mt-20">
            {/* Role Tags */}
            <div className="flex flex-wrap gap-3 mb-6 md:mb-8">
              {[
                "Computer Science",
                "Software Engineer",
                "Machine Learning",
                "Frontend",
              ].map((role) => (
                <span
                  key={role}
                  className="hero-role-tag font-sans text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-brand-text-muted border border-brand-neutral/30 px-3 py-1.5 opacity-0"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[11vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.8vw] font-light leading-[1.08] tracking-tight text-brand-text">
              <span className="block overflow-hidden py-1">
                <span className="block hero-line-inner translate-y-[120%] origin-top-left shiny-text">
                  Designing software
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="block hero-line-inner translate-y-[120%] origin-top-left text-brand-text-muted">
                  people remember.
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <div className="hero-subtitle opacity-0 mt-8 md:mt-12 max-w-[550px]">
              <p className="font-sans text-[11px] md:text-xs font-light tracking-[0.15em] uppercase leading-[2] text-brand-text-muted">
                I build thoughtful digital products that combine engineering,
                clean design, and delightful interactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 z-10"
        aria-hidden="true"
      >
        <span className="text-[9px] font-sans font-medium tracking-[0.3em] text-brand-text-muted uppercase mb-3">
          Scroll
        </span>
        <div className="w-[1px] h-14 bg-brand-neutral/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-brand-text-muted animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
