"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const images = ["/back1.jpeg", "/back2.jpeg", "/back3.jpeg"];
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentRef = useRef(current);
  const timeoutRef = useRef<number | null>(null);

  // durations (ms)
  const fadeDuration = 1000; // crossfade duration
  const displayDuration = 5000; // how long each slide stays

  // keep currentRef in sync
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const next = (currentRef.current + 1) % images.length;

      // set prev to the currently visible image
      setPrev(currentRef.current);

      // show the next image (on top) and start transition
      setCurrent(next);
      setIsTransitioning(true);

      // clear any prior timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // after fade completes, stop transitioning and update prev to match current
      timeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        setPrev(next);
        timeoutRef.current = null;
      }, fadeDuration);

      // update ref
      currentRef.current = next;
    }, displayDuration);

    return () => {
      clearInterval(intervalId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [images.length]);

  return (
    <section
      aria-label="Hero"
      className="
        relative w-full overflow-hidden flex items-center 
        justify-center md:justify-start
        px-6 sm:px-8 md:px-24
        py-16 sm:py-20 md:py-28 lg:py-32
        min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh]
      "
    >
      {/* Background images (prev + current) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Both images always present, only opacity changes */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={images[prev]}
            alt={`background ${prev + 1}`}
            fill
            priority
            unoptimized
            className={`object-cover transition-opacity duration-[1000ms] ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            style={{ zIndex: 1 }}
          />
          <Image
            src={images[current]}
            alt={`background ${current + 1}`}
            fill
            priority
            unoptimized
            className={`object-cover transition-opacity duration-[1000ms] ${isTransitioning ? "opacity-100" : "opacity-0"}`}
            style={{ zIndex: 2 }}
          />
        </div>
        {/* Overlay always above both images */}
        <div className="absolute inset-0 bg-blue-900/30 pointer-events-none" style={{ zIndex: 3 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
          Welcome to <br /> BME Connect Summit
        </h1>

        <p className="text-lg md:text-2xl text-white mb-4 max-w-xl mx-auto md:mx-0">
          Uniting BME with opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-6 mb-6 justify-center md:justify-start">
          {/* Location */}
          <span className="flex items-center text-white text-base md:text-lg">
            <svg
              className="w-5 h-5 mr-1 text-blue-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1 1 16 0c0 4.627-3.582 10-8 10z"
              />
              <circle cx="12" cy="11" r="3" />
            </svg>
            SANTIKA HALL, Mwenge, Dsm
          </span>

          {/* Date */}
          <span className="flex items-center text-white text-base md:text-lg">
            <svg
              className="w-5 h-5 mr-1 text-blue-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            15th-16th May 2026
          </span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-4">
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
