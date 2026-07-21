"use client";
import React, { useState, useEffect } from 'react';

export default function StarsBackground() {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      size: `${1 + Math.random() * 2}px`
    })));
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden bg-transparent">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-star-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
            boxShadow: `0 0 ${parseInt(star.size) * 4}px rgba(255,255,255,0.9)`
          }}
        />
      ))}
    </div>
  );
}
