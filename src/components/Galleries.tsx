import React from "react";
import Image from "next/image";

const galleryImages = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
];

export default function Galleries() {
  return (
    <section id="galleries" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
          Gallery
        </h2>
        <p className="text-blue-800 text-center mb-12">
          Take a look at the exciting gallery catalog.
        </p>

        {/* Flexbox gallery */}
        <div className="flex flex-wrap gap-6 justify-center">
          {galleryImages.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`Gallery item ${idx + 1}`}
              width={300}   // adjust width as needed
              height={200}  // preserves aspect ratio
              className="rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 object-cover cursor-pointer hover:scale-105"
              priority={idx === 0}
            />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold mt-8">
            View More Photos
          </button>
        </div>
      </div>
    </section>
  );
}
