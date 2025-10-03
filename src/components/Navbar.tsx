"use client";

import React, { useState } from "react";
import Image from "next/image";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Registration", href: "#registration" },
  { name: "Innovation", href: "#innovation" },
  { name: "Partners and Sponsors", href: "#partners" },
  { name: "Gallery", href: "#galleries" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-100 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <span className="flex items-center gap-2 font-bold text-blue-900 text-lg">
          <Image src="/logo.png" alt="BME Connect Summit Logo" width={36} height={36} className="rounded-full" />
          BME Connect Summit
        </span>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-blue-900 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Desktop menu */}
  <ul className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-blue-800 hover:text-blue-600 transition-colors px-2 py-1 rounded-md"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-100 shadow-lg relative">
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-blue-800 hover:text-blue-600 hover:underline transition-colors px-2 py-2 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
