"use client";
import React from "react";
import Image from "next/image";

const galleryImages = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
  "/gallery7.jpg",
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

        {/* Marquee gallery with horizontal scroll */}
        <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 hide-scrollbar">
          <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-max">
            {galleryImages.concat(galleryImages).map((img, idx) => (
              <div key={idx} className="inline-block">
                <Image
                  src={img}
                  alt={`Gallery item ${idx + 1}`}
                  width={300}
                  height={200}
                  className="rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 object-cover cursor-pointer hover:scale-105"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
