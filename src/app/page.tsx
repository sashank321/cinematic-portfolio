"use client";

import SmoothScroll from "src/components/SmoothScroll";
import CustomCursor from "src/components/CustomCursor";
import Navbar from "src/components/Navbar";
import Hero from "src/components/Hero";
import Projects from "src/components/Projects";
import About from "src/components/About";
import Skills from "src/components/Skills";
import Contact from "src/components/Contact";

import ScrollProgress from "src/components/ScrollProgress";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <ScrollProgress />

      <main className="w-full flex flex-col bg-transparent text-brand-text relative">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
