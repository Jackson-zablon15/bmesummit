"use client";
import React from "react";
import Image from "next/image";

const galleryImages = [
  "/gallery (1).jpg",
  "/gallery (2).jpg",
  "/gallery (3).jpg",
  "/gallery (4).jpg",
  "/gallery (5).jpg",
  "/gallery (6).jpg",
  "/gallery (7).jpg",
  "/gallery (8).jpg",
  "/gallery (9).jpg",
  "/gallery (10).jpg",
  "/gallery (11).jpg",
  "/gallery (12).jpg",
  "/gallery (13).jpeg",
  "/gallery (14).jpeg",
  "/gallery (15).jpeg",
  "/gallery (16).jpeg",
  "/gallery (17).jpeg",
  "/gallery (18).jpeg",
  "/gallery (19).jpeg",
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
