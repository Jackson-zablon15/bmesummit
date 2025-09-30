import React from "react";
import Image from "next/image";

const galleryImages = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
];

export default function Galleries() {
  return (
    <section id="galleries" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">Event Highlights</h2>
        <p className="text-blue-800 text-center mb-12">Take a look at the exciting moments captured during the event.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="w-full h-48 md:h-56 relative overflow-hidden rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition duration-300">
              <Image
                src={img}
                alt={`Gallery item ${idx + 1}`}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold mt-8">View More Photos</button>
        </div>
      </div>
    </section>
  );
}
