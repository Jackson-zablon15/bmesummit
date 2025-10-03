import React from "react";

export default function Registration() {
  return (
    <section id="registration" className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">Secure Your Spot</h2>
        <p className="text-blue-800 text-center mb-8">Be part of this exciting 2-day event. Fill out the form below to reserve your spot.</p>
        <form className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-900 font-medium mb-1">Full Name<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>
              </span>
              <input type="text" id="name" name="name" required className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500" placeholder="Your full name" />
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-900 font-medium mb-1">Email<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><polyline points="2,7 12,13 22,7"/></svg>
              </span>
              <input type="email" id="email" name="email" required className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500" placeholder="you@email.com" />
            </div>
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-blue-900 font-medium mb-1">Phone Number<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.06.37 2.09.72 3.08a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.02.59 3.08.72A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <input type="tel" id="phone" name="phone" required className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500" placeholder="Your phone number" />
            </div>
          </div>
          {/* Organization */}
          <div className="mb-4">
            <label htmlFor="organization" className="block text-blue-900 font-medium mb-1">Organization<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
              </span>
              <input type="text" id="organization" name="organization" required className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500" placeholder="Your organization" />
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold shadow transition">Register</button>
          {/* Disclaimer */}
          <p className="text-sm text-gray-500 mt-2 text-center">Your information will only be used for event updates.</p>
        </form>
      </div>
    </section>
  );
}
