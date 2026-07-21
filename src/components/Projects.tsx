"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "src/data/projects";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const RADIUS = 3500;
  const ANGLE_PER_ITEM = 7; // degrees between projects
  const TOTAL_ITEMS = PROJECTS_DATA.length;
  const MAX_ROTATION = (TOTAL_ITEMS - 1) * ANGLE_PER_ITEM;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal header
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Master timeline for the entire pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          snap: {
            snapTo: 1 / (TOTAL_ITEMS - 1),
            duration: { min: 0.2, max: 0.8 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const currentWheelRot = -self.progress * MAX_ROTATION;
            itemsRef.current.forEach((_, i) => {
              const content = contentRefs.current[i];
              if (!content) return;
              const globalAngle = i * ANGLE_PER_ITEM + currentWheelRot;
              const absAngle = Math.abs(globalAngle);

              // If absAngle is 0, it's center.
              const isActive = absAngle < 5;
              const opacity = Math.max(0.15, 1 - absAngle / 25);
              const scale = Math.max(0.85, 1 - absAngle / 60);

              gsap.set(content, {
                opacity,
                scale,
              });

              // Highlight the active link
              const link = content.querySelector(".project-link");
              if (link) {
                if (isActive) {
                  link.classList.add("pointer-events-auto");
                  link.classList.remove("pointer-events-none");
                } else {
                  link.classList.add("pointer-events-none");
                  link.classList.remove("pointer-events-auto");
                }
              }
            });
          },
        },
      });

      // 2. Rotate the wheel based on scroll progress
      tl.to(wheelRef.current, {
        rotation: -MAX_ROTATION,
        ease: "none",
      }, 0);

      // 3. Counter-rotate the contents to keep them upright
      itemsRef.current.forEach((_, i) => {
        const initialAngle = i * ANGLE_PER_ITEM;
        const content = contentRefs.current[i];
        if (!content) return;

        tl.fromTo(
          content,
          { rotation: -initialAngle },
          {
            rotation: -initialAngle + MAX_ROTATION,
            ease: "none",
          },
          0
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [MAX_ROTATION]);

  // Generate background ticks
  const ticks = Array.from({ length: 120 }).map((_, i) => {
    const angle = -40 + i * 2; // Ticks every 2 degrees
    const isMajor = i % 5 === 0;
    return (
      <div
        key={i}
        className="absolute top-0 left-1/2 origin-bottom bg-brand-text-muted"
        style={{
          width: isMajor ? "2px" : "1px",
          height: isMajor ? "16px" : "10px",
          transform: `translateX(-50%) rotate(${angle}deg)`,
          transformOrigin: `50% ${RADIUS}px`,
          opacity: isMajor ? 0.3 : 0.1,
        }}
      />
    );
  });

  return (
    <section
      id="work"
      ref={containerRef}
      className="w-full relative h-[600vh] bg-transparent"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col pt-32 md:pt-40 select-none bg-transparent">
        {/* Header */}
        <div className="projects-header max-w-[1400px] w-full mx-auto px-6 md:px-12 z-10 flex-shrink-0">
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-brand-text-muted uppercase block mb-3">
            01 / Selected Work
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-brand-text flex justify-between items-end">
            <span className="shiny-text">Case Studies</span>
            <span className="font-sans text-[11px] md:text-xs text-brand-text-muted uppercase tracking-[0.15em] max-w-[200px] text-right hidden sm:block">
              Scroll to explore
            </span>
          </h2>
        </div>

        {/* Curved Timeline Container */}
        <div className="relative flex-1 w-full mt-20">
          {/* Center active indicator (The blue line in user's image) */}
          <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[2px] h-32 bg-[#0070F3] z-20 shadow-[0_0_15px_rgba(0,112,243,0.5)]" />

          {/* The huge rotating wheel */}
          <div
            ref={wheelRef}
            className="absolute left-1/2 top-[50px] rounded-full z-10"
            style={{
              width: RADIUS * 2,
              height: RADIUS * 2,
              transform: "translateX(-50%)",
            }}
          >
            {/* Ticks */}
            {ticks}

            {/* Projects */}
            {PROJECTS_DATA.map((project, i) => {
              const initialAngle = i * ANGLE_PER_ITEM;
              return (
                <div
                  key={project.id}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="absolute top-0 left-1/2 origin-bottom flex flex-col items-center justify-start pointer-events-none"
                  style={{
                    width: "300px",
                    height: RADIUS,
                    transform: `translateX(-50%) rotate(${initialAngle}deg)`,
                  }}
                >
                  <div
                    ref={(el) => { contentRefs.current[i] = el; }}
                    className="project-content flex flex-col items-center mt-36 space-y-4"
                  >
                    <span className="font-sans text-xs font-bold text-brand-text-muted tracking-[0.2em] tabular-nums">
                      {project.year}
                    </span>

                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-brand-neutral/30 my-4 shadow-xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>

                    <h3 className="font-serif text-2xl font-light text-brand-text text-center leading-tight">
                      {project.title}
                    </h3>
                    
                    <span className="font-sans text-[10px] text-brand-text-muted uppercase tracking-widest text-center px-4">
                      {project.category}
                    </span>

                    <Link
                      href={`/work/${project.id}`}
                      className="project-link mt-6 px-6 py-2 rounded-full bg-brand-text text-brand-bg font-sans text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity pointer-events-none magnetic-btn"
                      data-cursor="CLICK"
                    >
                      View Case Study
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Soft gradient overlay at the bottom of the timeline curve to blend it */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-30" />
      </div>
    </section>
  );
}
