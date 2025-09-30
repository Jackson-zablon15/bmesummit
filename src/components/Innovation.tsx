
"use client";
import React, { useState } from "react";
import Image from "next/image";

const innovations = [
  {
    name: "Smart Glucose Monitor",
    description: "Real-time blood sugar tracking for diabetic patients.",
  image: "/innovationPlaceholder.jpg",
    tags: ["Electronic", "AI"],
  },
  {
    name: "AI-Based Heart Scanner",
    description: "AI-assisted diagnosis for cardiovascular diseases.",
  image: "/innovationPlaceholder.jpg",
    tags: ["AI", "Imaging"],
  },
  {
    name: "Portable Dialysis Kit",
    description: "Compact, affordable dialysis solution for home use.",
  image: "/innovationPlaceholder.jpg",
    tags: ["Mechanical", "Electronic"],
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

  const tagOptions = ["Electronic", "AI", "Mechanical", "Imaging"];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "file") {
      setForm((f) => ({ ...f, photo: (e.target as HTMLInputElement).files?.[0] || null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleTagChange(tag: string) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((t) => t !== tag)
        : [...f.tags, tag],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowForm(false);
      setForm({ name: "", photo: null, description: "", tags: [] });
      alert("Application submitted!");
    }, 1200);
  }

  return (
    <section id="innovation" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">Innovations Showcase</h2>
        <p className="text-blue-800 text-center mb-10">
          Discover cutting-edge biomedical innovations from talented participants and teams. Learn about their solutions and apply to be part of the next big idea.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 flex flex-col"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mt-4">{item.name}</h3>
              <p className="text-blue-800 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold cursor-pointer transition"
            onClick={() => setShowForm(true)}
          >
            Apply Now
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowForm(false)}
          >
            <form
              className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn"
              onSubmit={handleSubmit}
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-3 right-3 text-blue-900 text-2xl font-bold hover:text-blue-600 cursor-pointer"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Apply Your Innovation</h3>
              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">Name of Innovation</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter innovation name"
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                />
              </label>
              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">Photo of Innovation</span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 bg-white placeholder-gray-400"
                  placeholder="Upload photo"
                />
              </label>
              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Describe your innovation"
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                />
              </label>
              <div className="mb-4">
                <span className="block text-blue-900 font-medium mb-2">Tags</span>
                <div className="flex flex-wrap gap-3">
                  {tagOptions.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.tags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-blue-800 text-sm">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
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
