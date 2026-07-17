"use client";

import { useEffect, useRef } from "react";

/*
  Interactive space background.
  - Light mode: Subtle drift particles with connecting lines.
  - Dark mode (OLED Black): Starfield with twinkling stars, depth-based parallax,
    and dynamic 3D shooting stars that zoom diagonally across the screen.
  - Interactive: Mouse movement deflects nearby stars and alters shooting star trails.
*/
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Starfield Particles (Disabled as per user request - focus on shooting stars)
    const PARTICLE_COUNT = 0;

    interface FieldParticle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      speed: number;
      angle: number;
      angleSpeed: number;
      twinkleSpeed: number;
      z: number;
    }

    const particles: FieldParticle[] = [];

    // Shooting Stars
    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      alpha: number;
      size: number;
      active: boolean;
      z: number;
    }

    const shootingStars: ShootingStar[] = [];
    const MAX_SHOOTING_STARS = 15; // Increased to 10-15 prominent stars

    const launchShootingStar = () => {
      const inactive = shootingStars.find((s) => !s.active);
      const angle = (Math.random() * 15 + 35) * (Math.PI / 180);
      const speed = Math.random() * 15 + 15; // Faster, prominent
      const z = Math.random() * 40 + 10;

      const star = {
        x: Math.random() * width * 1.2,
        y: -100,
        vx: Math.cos(angle) * speed * (20 / z),
        vy: Math.sin(angle) * speed * (20 / z),
        length: Math.random() * 100 + 80,
        alpha: 1.0,
        size: (Math.random() * 2 + 1.2) * (20 / z),
        active: true,
        z,
      };

      if (inactive) {
        Object.assign(inactive, star);
      } else if (shootingStars.length < MAX_SHOOTING_STARS) {
        shootingStars.push(star);
      }
    };

    const mouse = mouseRef.current;
    let time = 0;

    const animate = () => {
      time++;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Randomly spawn shooting stars
      if (isDark && Math.random() < 0.05) { // Increased spawn rate for 15 stars
        launchShootingStar();
      }

      // Draw Starfield / Particles (Disabled)

      // Draw Shooting Stars (Dark Mode Only)
      if (isDark) {
        for (const s of shootingStars) {
          if (!s.active) continue;

          // Update position
          s.x += s.vx;
          s.y += s.vy;
          s.alpha -= 0.015; // gradual fade

          // Deactivate when faded or out of bounds
          if (s.alpha <= 0 || s.x > width + 100 || s.y > height + 100) {
            s.active = false;
            continue;
          }

          // Draw head
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.shadowBlur = s.size * 5;
          ctx.shadowColor = `rgba(255, 255, 255, ${s.alpha * 0.8})`;
          ctx.fill();

          // Draw elegant trailing tail
          ctx.beginPath();
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 3, s.y - s.vy * 3);
          grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha * 0.8})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.size;
          ctx.lineCap = "round";
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3);
          ctx.stroke();
        }
      }

      // Draw subtle connecting lines (Light Mode Only)
      if (!isDark) {
        ctx.shadowBlur = 0;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              const lineAlpha = (1 - dist / 90) * 0.015;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(0, 0, 0, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onResize = () => {
      ctx.resetTransform();
      resize();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  );
}
