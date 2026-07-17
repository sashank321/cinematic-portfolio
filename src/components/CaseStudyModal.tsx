"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ProjectType } from "src/data/projects";

interface CaseStudyModalProps {
  project: ProjectType;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";

    // Clip-path reveal from bottom center
    gsap.fromTo(
      overlayRef.current,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 0.9, ease: "power4.out" }
    );

    gsap.fromTo(
      ".case-fade",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.06, delay: 0.3, ease: "power3.out" }
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => {
        const lenis = (window as any).lenis;
        if (lenis) lenis.start();
        document.body.style.overflow = "";
        onClose();
      },
    });
  };

  const sections = [
    { num: "01", label: "Overview", title: "The Vision & Context", content: project.overview },
    { num: "02", label: "The Challenge", title: "Problem Statement", content: project.problem },
    { num: "03", label: "Research", title: "Research & Strategy", content: project.research },
    { num: "04", label: "Process", title: "Design & Architecture", content: project.process },
    { num: "05", label: "Decisions", title: "Key Decisions", content: project.decisions },
    { num: "06", label: "Engineering", title: "Development", content: project.development },
    { num: "07", label: "Challenges", title: "Obstacles & Solutions", content: project.challenges },
    { num: "08", label: "Learnings", title: "Takeaways", content: project.learnings },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 w-full h-screen bg-brand-bg z-50 overflow-y-auto no-scrollbar select-none"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-8 right-6 md:right-12 z-50 flex items-center gap-3 cursor-pointer group magnetic-btn"
        data-cursor="CLOSE"
        aria-label="Close Case Study"
      >
        <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-brand-text uppercase transition-opacity group-hover:opacity-60">
          Close
        </span>
        <div className="w-8 h-8 rounded-full border border-brand-text/10 flex items-center justify-center backdrop-blur-sm group-hover:border-brand-text/30 transition-colors duration-300">
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>

      <article className="w-full">
        {/* Cinematic Hero */}
        <header className="relative w-full h-[70vh] md:h-[85vh] bg-brand-secondary overflow-hidden flex items-end case-fade">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-90"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-70" />
          </div>

          <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[700px]">
              <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-[0.25em] uppercase block mb-3">
                Project {project.number} / Case Study
              </span>
              <h1 className="font-serif text-4xl md:text-7xl font-light tracking-tight text-brand-text">
                {project.title}
              </h1>
            </div>
            <div className="flex flex-col md:items-end">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-1">
                Year & Category
              </span>
              <span className="font-sans text-xs font-medium text-brand-text uppercase tracking-widest">
                {project.year} — {project.category}
              </span>
            </div>
          </div>
        </header>

        {/* Editorial Content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left sidebar */}
            <div className="lg:col-span-4 space-y-10 case-fade">
              <div className="border-t border-brand-neutral/30 pt-6">
                <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-widest block uppercase mb-3">
                  Role
                </span>
                <p className="font-sans text-xs font-medium text-brand-text leading-relaxed">
                  Full-Stack Engineer & Designer
                </p>
              </div>

              <div className="border-t border-brand-neutral/30 pt-6">
                <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-widest block uppercase mb-3">
                  Technology
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="font-sans text-[9px] font-semibold text-brand-text px-2.5 py-1 bg-brand-secondary border border-brand-neutral/20 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Story sections */}
            <div className="lg:col-span-8 space-y-16 case-fade">
              {sections.map((section) => (
                <div key={section.num} className="border-t border-brand-neutral/15 pt-10">
                  <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-[0.25em] uppercase block mb-3">
                    {section.num} / {section.label}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-brand-text mb-4">
                    {section.title}
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-brand-text-muted leading-[1.9] font-light">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Result */}
              <div className="border-t border-brand-neutral/15 pt-10 bg-brand-secondary p-8 border border-brand-neutral/20">
                <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-[0.25em] uppercase block mb-2">
                  Result
                </span>
                <p className="font-serif text-xl italic text-brand-text leading-relaxed">
                  &ldquo;{project.result}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <div className="py-24 text-center border-t border-brand-neutral/15">
          <button
            onClick={handleClose}
            className="font-serif text-3xl md:text-5xl font-light hover:opacity-60 transition-opacity duration-300 cursor-pointer magnetic-btn"
            data-cursor="CLOSE"
          >
            Return &rarr;
          </button>
        </div>
      </article>
    </div>
  );
}
