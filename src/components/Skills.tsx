"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: "01 / Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    category: "02 / Backend",
    skills: ["Node.js", "Python", "Java", "RESTful APIs", "GraphQL", "Microservices"],
  },
  {
    category: "03 / Data & ML",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "Jupyter", "NumPy"],
  },
  {
    category: "04 / Tools",
    skills: ["Git / GitHub", "Figma", "Docker", "Vercel", "VS Code", "CI/CD"],
  },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header clip-path wipe
      gsap.fromTo(
        ".skills-header",
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

      // Skill columns stagger in
      gsap.fromTo(
        ".skill-column",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
          },
        }
      );

      // Individual skill items
      gsap.fromTo(
        ".skill-item",
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="w-full py-24 md:py-32 select-none section-reveal bg-transparent relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="skills-header flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-36">
          <div>
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-brand-text-muted uppercase block mb-3">
              03 / Technical Competence
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-brand-text">
              Expertise & Frameworks
            </h2>
          </div>
          <p className="font-sans text-[11px] md:text-xs text-brand-text-muted uppercase tracking-[0.15em] max-w-[300px] mt-4 md:mt-0 leading-relaxed">
            Structuring robust applications with high-performance technologies and elegant architecture.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {SKILLS_DATA.map((group, idx) => (
            <div key={idx} className="space-y-6 skill-column">
              <h3 className="font-sans text-[10px] font-bold text-brand-text-muted tracking-[0.2em] uppercase border-b border-brand-neutral/30 pb-3">
                {group.category}
              </h3>

              <ul className="space-y-3">
                {group.skills.map((skill) => {
                  const isHovered = hoveredSkill === skill;
                  const isAnyHovered = hoveredSkill !== null;
                  return (
                    <li
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="skill-item transition-all duration-300"
                      style={{
                        opacity: isAnyHovered && !isHovered ? 0.3 : 1,
                        transform: isHovered ? "translateX(6px)" : "translateX(0)",
                      }}
                    >
                      <span className="font-serif text-xl md:text-2xl font-light block cursor-default select-none text-brand-text">
                        {skill}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
