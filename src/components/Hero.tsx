"use client";

import React, { useEffect, useState } from "react";

export default function Hero() {
  const images = ["/back1.jpg", "/back2.jpg", "/back3.jpg"];
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
    <div className="w-full flex flex-col items-center justify-center min-h-[100vh] text-center relative bg-black overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-100 mb-4">
          Welcome to BME Connect Summit
        </h1>
        <button className="bg-blue-800 text-white px-6 py-3 rounded-full shadow hover:bg-blue-900 transition">
          Register Now
        </button>
      </div>
    </div>
  );
}
