"use client";
import React, { useState } from "react";

export default function Registration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });

  // Simple sanitization function
  function sanitize(input: string) {
    return input.replace(/<[^>]*>?/gm, "").trim();
  }

  function validate() {
    let valid = true;
    let newErrors = { name: "", email: "", phone: "", organization: "" };
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
      valid = false;
    }
    if (!/^[\w\s.'-]{2,}$/.test(form.name)) {
      newErrors.name = "Name contains invalid characters.";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (!/[\d+\-()\s]{7,}/.test(form.phone)) {
      newErrors.phone = "Invalid phone number.";
      valid = false;
    }
    if (!form.organization.trim()) {
      newErrors.organization = "Organization is required.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Sanitize all fields
    const sanitized = {
      name: sanitize(form.name),
      email: sanitize(form.email),
      phone: sanitize(form.phone),
      organization: sanitize(form.organization),
    };
    setForm(sanitized);
    if (validate()) {
      // Submit logic here (e.g., send to API)
      alert("Registration submitted successfully!");
    }
  }

  return (
    <section id="registration" className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">Secure Your Spot</h2>
        <p className="text-blue-800 text-center mb-8">Be part of this exciting 2-day event. Fill out the form below to reserve your spot.</p>
        <form className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8" onSubmit={handleSubmit} autoComplete="off" noValidate>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-900 font-medium mb-1">Full Name<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-900 font-medium mb-1">Email<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><polyline points="2,7 12,13 22,7"/></svg>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-blue-900 font-medium mb-1">Phone Number<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.06.37 2.09.72 3.08a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.02.59 3.08.72A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
                placeholder="Your phone number"
                value={form.phone}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
          {/* Organization */}
          <div className="mb-4">
            <label htmlFor="organization" className="block text-blue-900 font-medium mb-1">Organization<span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
              </span>
              <input
                type="text"
                id="organization"
                name="organization"
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
                placeholder="Your organization"
                value={form.organization}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
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
