"use client";

import React, { useEffect, useState } from "react";

export default function Hero() {
  const images = ["/back1.jpg", "/back2.jpg","/back3.jpg"];
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((prevIndex) => (prevIndex + 1) % images.length);
      setFading(true);
      const timeout = setTimeout(() => setFading(false), 2500);
      return () => clearTimeout(timeout);
    }, 6000);
    return () => clearInterval(interval);
  }, [current, images.length]);

  return (
    <div className="w-full min-h-[100vh] relative bg-black overflow-hidden flex items-center">
      {/* Previous image fading out */}
      <div
        className={`absolute inset-0 w-full h-full z-0 bg-center bg-no-repeat transition-opacity duration-[2500ms] ${
          fading ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${images[prev]})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/30" />
      </div>

      {/* Current image fading in */}
      <div
        className={`absolute inset-0 w-full h-full z-0 bg-center bg-no-repeat transition-opacity duration-[2500ms] ${
          fading ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${images[current]})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/30" />
      </div>


      <div className="absolute top-1/2 left-0 z-10 flex flex-col items-start pl-8 md:pl-24 -translate-y-1/2">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4 leading-tight">
          Welcome to <br /> BME Connect Summit
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 mb-4 max-w-xl">
          Uniting BME with opportunities.
        </p>
        <div className="flex items-center gap-6 mb-6">
          {/* Location */}
          <span className="flex items-center text-blue-100 text-base md:text-lg">
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
            Muhas
          </span>
          {/* Date */}
          <span className="flex items-center text-blue-100 text-base md:text-lg">
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
            October 3, 2025
          </span>
        </div>
        <button className="bg-blue-800 text-white px-6 py-3 rounded-full shadow hover:bg-blue-900 transition">
          Register Now
        </button>
      </div>
    </div>
  );
}
