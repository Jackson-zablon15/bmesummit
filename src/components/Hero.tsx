"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const headlinePhrases = [
  "Innovation.",
  "Mentorship.",
  "BME Connect Summit.",
];

export default function Hero() {
  const images = ["/back1.jpeg", "/back2.jpeg", "/back3.jpeg"];
  const [current, setCurrent] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const displayDuration = 5000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, displayDuration);

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    const activePhrase = headlinePhrases[phraseIndex];
    const hasCompletedTyping = typedText === activePhrase;
    const hasDeletedPhrase = typedText.length === 0;

    let timeoutMs = isDeleting ? 45 : 85;

    if (!isDeleting && hasCompletedTyping) {
      timeoutMs = 1600;
    } else if (isDeleting && hasDeletedPhrase) {
      timeoutMs = 280;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting) {
        if (hasCompletedTyping) {
          setIsDeleting(true);
          return;
        }

        setTypedText(activePhrase.slice(0, typedText.length + 1));
        return;
      }

      if (hasDeletedPhrase) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % headlinePhrases.length);
        return;
      }

      setTypedText(activePhrase.slice(0, typedText.length - 1));
    }, timeoutMs);

    return () => clearTimeout(timeoutId);
  }, [isDeleting, phraseIndex, typedText]);

  return (
    <section
      aria-label="Hero"
      className="
        relative w-full overflow-hidden flex items-center 
        justify-start
        px-6 sm:px-8 md:px-24
        py-16 sm:py-20 md:py-28 lg:py-32
        min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen
      "
    >
      {/* Keep all slides mounted and only fade opacity to avoid a flash between swaps. */}
      <div className="absolute inset-0 w-full h-full z-0">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`background ${index + 1}`}
            fill
            priority={index === 0}
            unoptimized
            className={`object-cover transition-opacity duration-[1000ms] ${index === current ? "opacity-100" : "opacity-0"}`}
            style={{ zIndex: 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-blue-900/30 pointer-events-none" style={{ zIndex: 3 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-left">
        <div className="mb-2 min-h-[6.5rem] sm:min-h-[7.5rem] md:min-h-[9.5rem]">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
            <span className="block">Welcome to</span>
            <span className="block text-white">
              {typedText}
              <span className="hero-type-cursor" aria-hidden="true">
                |
              </span>
            </span>
          </h1>
        </div>

        <div className="flex items-center justify-start gap-4">
          <a
            href="#registration"
            className="bg-blue-800 text-white px-4 py-2 rounded-full shadow hover:bg-blue-900 text-sm md:text-base transition text-center"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
