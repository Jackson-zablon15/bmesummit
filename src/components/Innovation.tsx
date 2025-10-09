"use client";
import React, { useState } from "react";
import Image from "next/image";

const innovations = [
  {
    name: "BiliMeasure",
    description:
      "A non-invasive device that measures bilirubin levels in neonates, helping in early detection of jaundice.",
    image: "/bilimeasure.jpg",
    tags: ["Electronic", "Medical"],
  },
  {
    name: "eDevice Management",
    description:
      "An AI-powered system that automates medical equipment tracking, maintenance, and performance monitoring to optimize utilization, reduce downtime, and lower operational costs.",
    image: "/edevice.jpg",
    tags: ["Electronic", "Medical", "AI"],
  },
];

export default function Innovation() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    photo: File | null;
    description: string;
    tags: string[];
  }>({
    name: "",
    photo: null,
    description: "",
    tags: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    photo: "",
    description: "",
    tags: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, type, value } = e.target;
    if (type === "file") {
      setForm((f) => ({
        ...f,
        photo: (e.target as HTMLInputElement).files?.[0] || null,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function validate() {
    let valid = true;
    const newErrors = { name: "", photo: "", description: "", tags: "" };
    if (!form.name.trim()) {
      newErrors.name = "Innovation name is required.";
      valid = false;
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
      valid = false;
    }
    if (!form.photo) {
      newErrors.photo = "Photo is required.";
      valid = false;
    }
    if (form.tags.length === 0) {
      newErrors.tags = "Select at least one tag.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setShowForm(false);
        setForm({ name: "", photo: null, description: "", tags: [] });
        alert("Application submitted!");
      }, 1200);
    }
  }

  return (
    <section id="innovation" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== Innovations Section ===== */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
          Innovations Showcase
        </h2>
        <p className="text-blue-800 text-center mb-10">
          Discover cutting-edge biomedical innovations from talented participants and teams. Learn about their solutions and apply to be part of the next big idea.
        </p>

        {/* ===== Horizontal Scroll Cards ===== */}
        <div className="overflow-x-auto w-full hide-scrollbar">
          <div className="flex gap-6 min-w-max">
            {innovations.map((item, idx) => (
              <div
                key={idx}
                className="inline-block bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 w-80 overflow-hidden align-top"
              >
                <div className="w-full h-44 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-56">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2 truncate">
                      {item.name}
                    </h3>
                    <p
                      className="text-blue-800 text-sm overflow-hidden text-ellipsis"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Apply Button ===== */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold cursor-pointer transition"
            onClick={() => setShowForm(true)}
          >
            Apply Now
          </button>
        </div>

        {/* ===== Abstracts Section ===== */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
            Abstracts
          </h2>
          <p className="text-blue-800 text-center mb-10">
            Get a chance to present your abstract at the summit. Submit your research abstracts and showcase your work to a wider audience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 flex flex-col w-full max-w-sm">
              <div className="w-full h-48 relative">
                <Image
                  src="/abstract1.jpg"
                  alt="Abstract 1"
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <p className="text-blue-800 mt-4 text-center">
                Advancing Equity through Climate-Resilient Malaria Solutions in Sub-Saharan Africa: A Comprehensive Desk Review
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold cursor-pointer transition"
              onClick={() => setShowForm(true)}
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* ===== Modal Form ===== */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowForm(false)}
          >
            <form
              className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn"
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-3 right-3 text-blue-900 text-2xl font-bold hover:text-blue-600 cursor-pointer"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
                Apply Your Abstract
              </h3>

              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">
                  Name of Abstract
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter innovation name"
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                />
              </label>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}

              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">
                  Photo of Abstract
                </span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 bg-white placeholder-gray-400 text-black"
                />
              </label>
              {errors.photo && (
                <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
              )}

              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">
                  Description
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Describe your innovation"
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                />
              </label>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg py-2 mt-2 transition cursor-pointer"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
