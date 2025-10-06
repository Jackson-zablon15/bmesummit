"use client";
import React, { useState } from "react";
import Image from "next/image";

const studentStartups = [
  {
    name: "ChuoMarket",
    logo: "/chuomarket.png", 
    description: "Buy and Sell goods and services online with ease. ChuoMarket is a user-friendly platform that connects buyers and sellers within the academic community. Join ChuoMarket today and experience hassle-free buying and selling at your fingertips!",
  },
  {
    name: "ZetuMED",
    logo: "/zetumedi.png",
    description: "Biomedical startup focused on innovative healthcare solutions. We also provide training to biomedical engineering students on medical equipment maintenance and repair.",
  },
];

const sponsors = [
  {
    name: "Hyper Med",
    logo: "/hyperMed.jpg",
    description:
      "A Tanzanian healthcare company supplying diagnostic kits, laboratory equipment and consumables, with installation, maintenance and technical support services for hospitals and laboratories.",
  },
];

export default function SponsorsSection() {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <>
      <section className="py-16 px-4 bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900">
          Our Sponsors
        </h2>

        {/* Sponsors Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="group bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl relative overflow-hidden min-h-[300px] w-64"
            >
              {/* Logo (visible initially, fades out on hover) */}
              <div className="transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-90">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name + " logo"}
                  width={180}
                  height={96}
                  className="object-contain h-24 w-auto"
                />
              </div>

              {/* Name + Description (hidden initially, fades in on hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center opacity-0 scale-90 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100">
                <div className="text-lg font-semibold text-blue-900 mb-2">
                  {sponsor.name}
                </div>
                <div className="text-sm text-blue-800">{sponsor.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Sponsor Button */}
        <div className="flex justify-center mt-24 relative h-16">
          {/* Animated icons */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-0 z-10"
            style={{ pointerEvents: showIcons ? "auto" : "none" }}
          >
            {/* Email icon */}
            <a
              href="mailto:info@bmesummit.org"
              className={`mb-2 bg-white rounded-full shadow-lg p-3 text-blue-800 border border-blue-200 transition-all duration-500 ease-in-out flex items-center justify-center
                ${showIcons ? "opacity-100 -translate-x-12 -translate-y-16 rotate-[-18deg]" : "opacity-0 translate-x-0 translate-y-0 rotate-0"}`}
              style={{ transitionDelay: showIcons ? "100ms" : "0ms" }}
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="4" width="20" height="16" rx="4" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>

            {/* WhatsApp icon */}
            <a
              href="https://wa.me/+255758758153"
              className={`bg-white rounded-full shadow-lg p-3 text-green-600 border border-green-200 transition-all duration-500 ease-in-out flex items-center justify-center
                ${showIcons ? 'opacity-100 translate-x-12 -translate-y-16 rotate-[18deg]' : 'opacity-0 translate-x-0 translate-y-0 rotate-0'}`}
              style={{ transitionDelay: showIcons ? '250ms' : '0ms' }}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* WhatsApp icon (official look) */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#25D366"/>
                <path d="M16 7.5c-4.7 0-8.5 3.7-8.5 8.3 0 1.5.4 2.9 1.1 4.1L7 25l5.3-1.4c1.2.6 2.5.9 3.7.9 4.7 0 8.5-3.7 8.5-8.3S20.7 7.5 16 7.5zm0 15c-1.2 0-2.3-.3-3.3-.8l-.2-.1-3.1.8.8-3-.2-.3c-.7-1.1-1-2.3-1-3.6 0-3.7 3.2-6.7 7-6.7s7 3 7 6.7-3.2 6.7-7 6.7zm4-5.1c-.2-.1-1.2-.6-1.3-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-.9-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.3 0-.4.2-.1.2-.5.5-.5 1.2s.5 1.4.6 1.5c.1.1 1.1 1.7 2.7 2.3 1.6.6 1.6.4 1.9.4.3 0 .9-.4 1-.8.1-.4.1-.7.1-.8 0-.1-.1-.1-.2-.2z" fill="#fff"/>
              </svg>
            </a>
          </div>

          <button
            className="bg-blue-800 text-white font-bold rounded-full px-8 py-2 shadow hover:bg-blue-900 transition relative z-20 text-base min-h-0"
            style={{ height: "40px" }}
            onClick={() => setShowIcons((v) => !v)}
          >
            Become a Sponsor
          </button>
        </div>
      </section>

      {/* Students Startups Section */}
      <section className="py-16 px-4 bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900">
          Students Startups
        </h2>

        {/* Startups Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {studentStartups.map((startup, idx) => (
            <div
              key={startup.name}
              className="group bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl relative overflow-hidden min-h-[300px] w-64"
            >
              {/* Logo (visible initially, fades out on hover) */}
              <div className="transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-90">
                {startup.logo ? (
                  <Image
                    src={startup.logo}
                    alt={startup.name + " logo"}
                    width={80}
                    height={80}
                    className="object-contain h-36 w-36 rounded-full"
                  />
                ) : (
                  <div className="bg-blue-100 rounded-full h-36 w-36 flex items-center justify-center text-4xl font-bold text-blue-700">
                    S{idx + 1}
                  </div>
                )}
              </div>

              {/* Name + Description (hidden initially, fades in on hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center opacity-0 scale-90 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100">
                <div className="text-lg font-semibold text-blue-900 mb-2">
                  {startup.name}
                </div>
                <div className="text-sm text-blue-800">{startup.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
