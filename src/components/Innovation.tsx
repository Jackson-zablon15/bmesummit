import React from "react";
import Image from "next/image";

const innovations = [
  {
    name: "Smart Glucose Monitor",
    description: "Real-time blood sugar tracking for diabetic patients.",
  image: "/innovationPlaceholder.jpg",
    tags: ["Electronic", "AI"],
  },
  {
    name: "AI-Based Heart Scanner",
    description: "AI-assisted diagnosis for cardiovascular diseases.",
  image: "/innovationPlaceholder.jpg",
    tags: ["AI", "Imaging"],
  },
  {
    name: "Portable Dialysis Kit",
    description: "Compact, affordable dialysis solution for home use.",
  image: "/innovationPlaceholder.jpg",
    tags: ["Mechanical", "Electronic"],
  },
];

export default function Innovation() {
  return (
    <section id="innovation" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">Innovations Showcase</h2>
        <p className="text-blue-800 text-center mb-10">
          Discover cutting-edge biomedical innovations from talented participants and teams. Learn about their solutions and apply to be part of the next big idea.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 flex flex-col"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mt-4">{item.name}</h3>
              <p className="text-blue-800 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold cursor-pointer transition">Apply Now</button>
        </div>
      </div>
    </section>
  );
}
