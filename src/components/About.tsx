"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    year: "2025",
    title: "Java Applications & OOP Mastery",
    description: "Built a suite of object-oriented applications. Gained deep understanding of design patterns, multithreading, and system architecture.",
    tags: ["Java", "OOP", "Systems"],
  },
  {
    year: "2025",
    title: "Data Science & Analytics",
    description: "Completed an advertising sales analysis project using Python and statistical modeling. Built modern web interfaces with React.",
    tags: ["Python", "Data Science", "React"],
  },
  {
    year: "2025",
    title: "Machine Learning & Predictive Models",
    description: "Explored neural networks, PyTorch, and predictive modeling for real-world dataset classification and regression.",
    tags: ["Python", "PyTorch", "Machine Learning"],
  },
  {
    year: "2026",
    title: "Cortex AI & Agent Orchestration",
    description: "Engineered Cortex AI — an autonomous multi-agent orchestration framework supporting real-time streaming and high-throughput reasoning.",
    tags: ["FastAPI", "Python", "AI Agents", "Redis"],
  },
  {
    year: "2026",
    title: "Interactive Portfolio & Advanced Frontend",
    description: "Engineered this portfolio — combining GSAP choreography, canvas particle systems, and editorial design into a cohesive interactive experience.",
    tags: ["Next.js", "GSAP", "Canvas", "Design"],
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header clip-path wipe from left
      gsap.fromTo(
        ".about-header",
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

      // Portrait reveal — vertical wipe
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      // Bio text — word-by-word opacity reveal linked to scroll
      gsap.fromTo(
        ".about-word",
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-text-container",
            start: "top 85%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // Timeline items stagger
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full py-24 md:py-40 select-none section-reveal bg-transparent relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header — horizontal wipe */}
        <div className="about-header mb-24 md:mb-36">
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-brand-text-muted uppercase block mb-3">
            02 / The Engineer
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-brand-text">
            About Sashank
          </h2>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 space-y-6">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] overflow-hidden bg-brand-secondary group"
              data-cursor="EXPLORE"
            >
              <Image
                src="/images/sashank.png"
                alt="Portrait of Sashank"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="flex justify-between items-center text-[9px] font-sans text-brand-text-muted tracking-[0.2em] uppercase">
              <span>Portrait — 2026</span>
              <span>Sashank</span>
            </div>
          </div>

          {/* Right Column: Bio + Timeline */}
          <div className="lg:col-span-7 space-y-20">
            {/* Bio */}
            <div className="space-y-8 max-w-[620px] about-text-container">
              <p className="font-serif text-2xl md:text-[2rem] font-light leading-relaxed text-brand-text">
                <SplitText
                  type="words"
                  text="I'm a Computer Science undergraduate who turns ideas into polished, usable digital products."
                  wordClassName="about-word"
                />
              </p>
              <p className="font-sans text-xs md:text-sm text-brand-text-muted leading-[1.9] font-light">
                <SplitText
                  type="words"
                  text="My work bridges engineering and design. I focus on Frontend Architecture, Machine Learning, Java, Python, and Design Systems — building applications that are structurally sound and delightfully interactive."
                  wordClassName="about-word"
                />
              </p>
              <p className="font-sans text-xs md:text-sm text-brand-text-muted leading-[1.9] font-light">
                <SplitText
                  type="words"
                  text="I believe software should be an experience. Every interface I build prioritizes craftsmanship, precision, and human-centered interaction."
                  wordClassName="about-word"
                />
              </p>
            </div>

            {/* Milestone Timeline */}
            <div className="timeline-container border-t border-brand-neutral/30 pt-12">
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-brand-text-muted uppercase block mb-8">
                Journey
              </span>

              <div className="space-y-0">
                {TIMELINE_DATA.map((item, idx) => (
                  <div
                    key={idx}
                    className="timeline-item border-b border-brand-neutral/20 opacity-0 group"
                  >
                    <button
                      className="w-full flex items-start md:items-center justify-between py-5 md:py-6 cursor-pointer text-left"
                      onClick={() =>
                        setExpandedTimeline(expandedTimeline === idx ? null : idx)
                      }
                      data-cursor="CLICK"
                    >
                      <div className="flex items-start md:items-center gap-4 md:gap-8">
                        <span className="font-sans text-xs font-bold tracking-widest text-brand-text-muted tabular-nums min-w-[40px]">
                          {item.year}
                        </span>
                        <span className="font-serif text-lg md:text-xl font-light text-brand-text group-hover:opacity-70 transition-opacity duration-300">
                          {item.title}
                        </span>
                      </div>

                      {/* Expand indicator */}
                      <div
                        className={`w-6 h-6 flex items-center justify-center transition-transform duration-500 ${
                          expandedTimeline === idx ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        <svg
                          className="w-3 h-3 text-brand-text-muted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <div
                      className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                      style={{
                        maxHeight: expandedTimeline === idx ? "200px" : "0px",
                        opacity: expandedTimeline === idx ? 1 : 0,
                      }}
                    >
                      <div className="pb-6 pl-12 md:pl-[72px]">
                        <p className="font-sans text-xs text-brand-text-muted leading-relaxed mb-3 max-w-[500px]">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-sans text-[9px] font-semibold tracking-[0.15em] uppercase text-brand-text-muted border border-brand-neutral/30 px-2 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
