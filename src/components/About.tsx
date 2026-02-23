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
            The BME CONNECT SUMMIT is Tanzania’s premier annual gathering that unites Biomedical Engineering students with Engineers,technicians, professionals, companies,  hospitals,policy makers,industry leaders and investors from across the country.
            More  than 500 participants come together for a two-day transformative experience of learning, innovation, networking, and collaboration.
            The Summit equips the next generation of biomedical innovators with competence-based skills in technology, entrepreneurship, and leadership, while offering direct engagement with industry leaders, policymakers, and investors.
            Through exhibitions, mentorship sessions, and open discussions, participants gain the exposure and opportunities needed to turn their ideas into impactful solutions that advance Tanzania’s and Africa’s healthcare systems.
          </p>

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
