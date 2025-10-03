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
        <div className="flex flex-col items-end">
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {/* Replace with lucide-react icons if available */}
            <a href="#" className="hover:text-blue-600 transition" aria-label="LinkedIn">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-900"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><line x1="12" y1="11" x2="12" y2="16"/><path d="M16 11v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-2"/></svg>
            </a>
            <a href="#" className="hover:text-blue-600 transition" aria-label="Twitter">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-900"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.5 1c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.69.1 1.02A12.94 12.94 0 0 1 3 2.1a4.48 4.48 0 0 0-.61 2.27c0 1.57.8 2.96 2.02 3.77A4.48 4.48 0 0 1 2 7.14v.06c0 2.2 1.56 4.03 3.64 4.45-.38.1-.78.16-1.19.16-.29 0-.57-.03-.85-.08.57 1.78 2.23 3.08 4.2 3.12A9.05 9.05 0 0 1 2 19.54a12.94 12.94 0 0 0 7 2.05c8.4 0 13-6.96 13-13v-.59A9.18 9.18 0 0 0 23 3z"/></svg>
            </a>
            <a href="https://www.instagram.com/bmeconnectsummit/" className="hover:text-blue-600 transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-900"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8a4 4 0 0 1 3.37 3.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
