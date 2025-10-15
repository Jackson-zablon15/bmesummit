"use client";
import React, { useState } from "react";
import Image from "next/image";
import Toast from "./Toast";

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
  // === FORM STATES ===
  const [showInnovationForm, setShowInnovationForm] = useState(false);

  const [innovationForm, setInnovationForm] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    description: "",

  });
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  // === GENERIC FORM HANDLER ===
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, type, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (type === "file") {
      setInnovationForm((f) => ({
        ...f,
        // @ts-ignore
        photo: (e.target as HTMLInputElement).files?.[0] || null,
      }));
    } else {
      setInnovationForm((f) => ({ ...f, [name]: value }));
    }
  }

  function validate(form: { name: string; description: string; }) {
    let valid = true;
    const newErrors = { name: "", description: "" };
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
      valid = false;
    }
   
    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = innovationForm;

    if (validate(formData)) {
      setSubmitting(true);

      try {
        const response = await fetch("/api/submit-innovation", {
          method: "POST",
          body: JSON.stringify({ name: formData.name, description: formData.description }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          setToast({ message: "Form submitted successfully!", type: "success" });
        } else {
          setToast({ message: "Error submitting form. Please try again.", type: "error" });
        }
      } catch (error: any) {
        setToast({ message: "Submission failed: " + error.message, type: "error" });
      } finally {
        setSubmitting(false);
        setInnovationForm({ name: "", description: "" });
        setShowInnovationForm(false);
      }
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

        {/* ===== Innovation Apply Button ===== */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold cursor-pointer transition"
            onClick={() => setShowInnovationForm(true)}
          >
            Apply for Innovation
          </button>
        </div>

        {/* ===== Innovation Modal Form ===== */}
        {showInnovationForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowInnovationForm(false)}
          >
            <form
              className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn"
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-3 right-3 text-blue-900 text-2xl font-bold hover:text-blue-600 cursor-pointer"
                onClick={() => setShowInnovationForm(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
                Apply Your Innovation
              </h3>

              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">
                  Name of Innovation
                </span>
                <input
                  type="text"
                  name="name"
                  value={innovationForm.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter innovation name"
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                />
              </label>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

              <label className="block mb-3">
                <span className="block text-blue-900 font-medium mb-1">
                  Description
                </span>
                <textarea
                  name="description"
                  value={innovationForm.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Describe your innovation"
                  className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                />
              </label>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
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
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
      </div>
    </section>
  );
}
