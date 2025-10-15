"use client";
import React, { useState } from "react";
import Image from "next/image";
import Toast from "./Toast";

export default function Abstract() {
  const [showAbstractForm, setShowAbstractForm] = useState(false);

  const [abstractForm, setAbstractForm] = useState<{
    name: string;
    description: string;
    photo?: File | null;
  }>({ name: "", description: "" });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, type, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (type === "file") {
      setAbstractForm((f) => ({
        ...f,
  // store file if needed later
  photo: (e.target as HTMLInputElement).files?.[0] || null,
      }));
    } else {
      setAbstractForm((f) => ({ ...f, [name]: value }));
    }
  }

  function validate(form: { name: string; description: string }) {
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
    const formData = abstractForm;

    if (validate(formData)) {
      setSubmitting(true);

      try {
        const body = { name: formData.name, description: formData.description, sheet: "Bme Connect Summit Abstracts", type: "abstract" };
        const response = await fetch("/api/submit-abstract", {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });

  await response.json();
  // show a basic alert for now; we'll replace with a toast later
        if (response.ok) {
          setToast({ message: "Abstract submitted successfully!", type: "success" });
          setAbstractForm({ name: "", description: "" });
          setShowAbstractForm(false);
        } else {
          setToast({ message: "Error submitting abstract. Please try again.", type: "error" });
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        alert("Submission failed: " + message);
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
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
          onClick={() => setShowAbstractForm(true)}
        >
          Apply for Abstract
        </button>
      </div>

      {showAbstractForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowAbstractForm(false)}
        >
          <form
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-blue-900 text-2xl font-bold hover:text-blue-600 cursor-pointer"
              onClick={() => setShowAbstractForm(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
              Apply Your Abstract
            </h3>

            <label className="block mb-3">
              <span className="block text-blue-900 font-medium mb-1">Name of Abstract</span>
              <input
                type="text"
                name="name"
                value={abstractForm.name}
                onChange={handleChange}
                required
                placeholder="Enter abstract name"
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
              />
            </label>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

            <label className="block mb-3">
              <span className="block text-blue-900 font-medium mb-1">Description</span>
              <textarea
                name="description"
                value={abstractForm.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe your abstract"
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
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
