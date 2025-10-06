import React from "react";
import Image from "next/image";

const boothImages = [
  "/booth2.jpg",
];

export default function Booth() {
  return (
    <section id="booth" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">
          Get your booth
        </h2>
        <p className="text-blue-800 text-center mb-10">
          Apply for the booth to showcase your products
        </p>
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {boothImages.map((img, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow-lg bg-white w-72 h-56 flex items-center justify-center">
              <Image
                src={img}
                alt={`Booth ${idx + 1}`}
                width={288}
                height={224}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <a
            href="https://wa.me/255674902811"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow text-center"
            style={{ display: 'inline-block' }}
          >
            Apply for Booth
          </a>
        </div>
      </div>
    </section>
  );
}
