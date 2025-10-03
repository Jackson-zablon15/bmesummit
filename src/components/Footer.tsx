import React from "react";
// If using lucide-react, import icons like:
// import { Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-8 bg-blue-50 shadow text-blue-900 rounded-2xl my-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Quick Links */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:underline hover:text-blue-600 transition">About</a></li>
            <li><a href="#registration" className="hover:underline hover:text-blue-600 transition">Registration</a></li>
            <li><a href="#innovation" className="hover:underline hover:text-blue-600 transition">Innovation</a></li>
            <li><a href="#galleries" className="hover:underline hover:text-blue-600 transition">Gallery</a></li>
          </ul>
        </div>
        {/* Social Media */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {/* Replace with lucide-react icons if available */}
            <a href="https://www.instagram.com/bmeconnectsummit/" className="hover:text-blue-600 transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-900"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8a4 4 0 0 1 3.37 3.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
