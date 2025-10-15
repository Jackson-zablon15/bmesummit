"use client";
import React, { useState } from "react";
import Image from "next/image";

const boothImages = [
  "/booth2.jpg",
];

export default function Booth() {
  const [showDetails, setShowDetails] = useState(false);
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

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-blue-700 hover:underline font-medium"
            onClick={() => setShowDetails((s) => !s)}
            aria-expanded={showDetails}
            aria-controls="booth-details"
          >
            {showDetails ? "Read less" : "Read more"}
          </button>
        </div>

        {showDetails && (
          <div id="booth-details" className="mt-6 bg-white rounded-lg shadow-sm p-6 text-left">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Booth Properties</h3>
            <h4 className="text-blue-900 font-medium mb-2">BOOTH SPECIFICATION</h4>
            <ul className="list-disc list-inside mb-3 text-sm text-gray-700">
              <li>Booth Dimensions: 3 meters (length) × 3 meters (width)</li>
              <li>Total Space: 9 square meters</li>
              <li>Panel Design: Constructed using three (3) panels, each measuring 96 cm, forming a complete booth setup.</li>
              <li>Height: 245 cm</li>
              <li>Setup: Fully furnished and decorated exhibition booth for both days of the summit</li>
            </ul>

            <h4 className="text-blue-900 font-medium mb-2">Booth Sponsorship Package – TZS 650,000</h4>
            <p className="mb-2 text-sm text-gray-700">Each booth sponsorship includes exclusive benefits such as:</p>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
              <li>Fully set-up and decorated exhibition booth (2 days)</li>
              <li>Organization logo placement on the official BME Connect Summit website and digital platforms</li>
              <li>Logo display on summit banners, posters, and event materials</li>
              <li>Media visibility and branding during and after the event</li>
              <li>Lunch and refreshments for two company representatives (both days)</li>
              <li>Participation in student mentorship and innovation guidance sessions</li>
              <li>Recognition as an Official Partner during the opening and closing ceremonies</li>
              <li>Inclusion in the Post-Event Report and media highlights</li>
              <li>Networking opportunities with policymakers, hospitals, innovators, and investors</li>
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
