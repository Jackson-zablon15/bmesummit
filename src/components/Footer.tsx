import React from "react";
// If using lucide-react, import icons like:
// import { Linkedin, Twitter, Instagram } from "lucide-react";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-8 bg-blue-50 shadow text-blue-900 rounded-2xl my-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Logo and Copyright */}
  <div className="flex flex-col items-start w-full md:w-1/4 mb-8 md:mb-0">
  <div className="flex align-center justify-center gap-3">
 <Image src="/logo.jpg" alt="BME Connect Summit Logo" width={48} height={48} className="rounded-full mb-2" />
          <span className="text-xl font-bold tracking-wide">BME Connect Summit</span>
  </div>
          <span className="text-xs text-blue-700 mt-2 flex items-center gap-1">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/><text x="6" y="15" fontSize="10" fill="currentColor">©</text></svg>
            2025 All rights reserved.
          </span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:underline hover:text-blue-600 transition">About</a></li>
            <li><a href="#registration" className="hover:underline hover:text-blue-600 transition">Registration</a></li>
            <li><a href="#innovation" className="hover:underline hover:text-blue-600 transition">Innovation</a></li>
            <li><a href="#galleries" className="hover:underline hover:text-blue-600 transition">Gallery</a></li>
          </ul>
        </div>

        {/* Address and Contact */}
        <div className="flex flex-col items-start w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-3">Address</h3>
          <p className="mb-1">Dar es Salaam</p>
          <p className="mb-1">Phone: <a href="tel:+255758758153" className="hover:underline text-blue-700">+255758758153</a></p>
            <p className="mb-1">Phone: <a href="tel:+255758758153" className="hover:underline text-blue-700">+255628342514</a></p>
          <p>Email: <a href="mailto:info@bmeconnectsummit.org" className="hover:underline text-blue-700">info@bmeconnectsummit.org</a></p>
        </div>

        {/* Social Media */}
  <div className="flex flex-col items-start w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/bmeconnectsummit/" className="hover:text-blue-600 transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-900"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8a4 4 0 0 1 3.37 3.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
