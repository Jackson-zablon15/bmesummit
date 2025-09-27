import React from "react";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <img src="https://via.placeholder.com/200x200" alt="Summit Hero" className="rounded-2xl shadow-lg mb-6" />
      <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">Welcome to BME Connect Summit</h1>
      <p className="text-blue-700 text-lg md:text-xl mb-6">It is not yet done. Here i will put background slideshow as hero section</p>
      <button className="bg-blue-800 text-white px-6 py-3 rounded-full shadow hover:bg-blue-900 transition">Register Now</button>
    </div>
  );
}
