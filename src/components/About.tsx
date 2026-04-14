"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            About BME Connect Summit
          </h2>
          <p className="text-blue-800 leading-relaxed mb-6">
           The BME Connect Summit is Tanzania’s premier biomedical engineering event, uniting over 500 students, professionals, 
           and industry leaders for networking, innovation, mentorship, and skills development to advance 
           healthcare solutions across Tanzania and Africa
          </p>

          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/30 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/45 text-blue-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1 1 16 0c0 4.627-3.582 10-8 10z"
                  />
                  <circle cx="12" cy="11" r="3" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Location
                </p>
                <p className="text-sm font-medium text-blue-900">
                  SANTIKA HALL, Mwenge, Dsm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/30 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/45 text-blue-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Date
                </p>
                <p className="text-sm font-medium text-blue-900">
                  15th-16th May 2026
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center">
              <Image src="/networking.jpg" alt="Networking icon" width={32} height={32} className="mb-2" />
              <h3 className="font-semibold text-blue-900">Networking</h3>
              <p className="text-sm text-blue-700">Connect with peers & experts.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center">
              <Image src="/innovation.jpg" alt="Innovation icon" width={32} height={32} className="mb-2" />
              <h3 className="font-semibold text-blue-900">Innovation</h3>
              <p className="text-sm text-blue-700">Discover new biomedical solutions.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center">
              <Image src="/training.jpg" alt="Training icon" width={32} height={32} className="mb-2" />
              <h3 className="font-semibold text-blue-900">Training</h3>
              <p className="text-sm text-blue-700">Workshops, panels & keynotes.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center">
              <Image src="/exhibition.jpg" alt="Exhibitions icon" width={32} height={32} className="mb-2" />
              <h3 className="font-semibold text-blue-900">Exhibitions</h3>
              <p className="text-sm text-blue-700">Transforming healthcare worldwide.</p>
            </div>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="flex justify-center">
          <Image
            src="/aboutus.jpeg"
            alt="About Summit"
            width={400}
            height={300}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
