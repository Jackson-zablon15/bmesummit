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
            The BME Connect Summit is a premier gathering of biomedical engineers, 
            innovators, healthcare professionals, and industry leaders. Our mission 
            is to foster collaboration, showcase cutting-edge innovations, and create 
            opportunities that drive advancements in healthcare technology.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow-md rounded-xl">
              <span className="text-2xl">🤝</span>
              <h3 className="font-semibold text-blue-900">Networking</h3>
              <p className="text-sm text-blue-700">Connect with peers & experts.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-xl">
              <span className="text-2xl">💡</span>
              <h3 className="font-semibold text-blue-900">Innovation</h3>
              <p className="text-sm text-blue-700">Discover new biomedical solutions.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-xl">
              <span className="text-2xl">🎓</span>
              <h3 className="font-semibold text-blue-900">Knowledge</h3>
              <p className="text-sm text-blue-700">Workshops, panels & keynotes.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-xl">
              <span className="text-2xl">🌍</span>
              <h3 className="font-semibold text-blue-900">Global Impact</h3>
              <p className="text-sm text-blue-700">Transforming healthcare worldwide.</p>
            </div>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="flex justify-center">
          <Image
            src="/aboutus.jpg"
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
