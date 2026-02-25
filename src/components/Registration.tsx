"use client";
import React, { useState, useRef, useMemo, useLayoutEffect } from "react";
import Image from "next/image";
import Toast from "./Toast";

export default function Registration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [heights, setHeights] = useState<{ [key: string]: number }>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Make agents stable so the measurement effect doesn't run every render
  const agents = useMemo(
    () => [
      {
        id: "muhas",
        name: "MUHAS",
        logo: "/muhas.png",
        // agentName is the contact person for payments; phone is the payment number placeholder
        agentName: "Theresia Thomas Bwana",
        phone: "0654 003 678",
      },
      {
        id: "dit",
        name: "DIT",
        logo: "/dit.png",
        agentName: "Said Shaban Namiyuya",
        phone: "0774 804 401",
      },
      {
        id: "atc",
        name: "ATC",
        logo: "/atc.png",
        agentName: "Jackson",
        phone: "0766565348",
      },
      {
        id: "must",
        name: "MUST",
        logo: "/must.png",
        agentName: "Abednego Albert Sasi",
        phone: "0757 106 722",
      },
       {
        id: "mvumi",
        name: "MVUMI",
        logo: "/mvumi.jpg",
        agentName: "Jackson",
        phone: "0766565348",
      },
    ],
    []
  );

  // Measure heights only when the modal is shown and on resize.
  // useLayoutEffect ensures we measure before paint.
  useLayoutEffect(() => {
    if (!showModal) return;

    const measure = () => {
      const newHeights: { [key: string]: number } = {};
      agents.forEach((agent) => {
        const el = contentRefs.current[agent.id];
        if (el) newHeights[agent.id] = el.scrollHeight;
      });
      setHeights(newHeights);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [showModal, agents]);

  const handleToggle = (id: string) => {
    setActiveAgent((prev) => (prev === id ? null : id));
  };

  function sanitize(input: string) {
    return input.replace(/<[^>]*>?/gm, "").trim();
  }

  function validate(formData = form) {
    let valid = true;
    const newErrors = { name: "", email: "", phone: "", institution: "" };
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
      valid = false;
    } else if (!/^[\w\s.'-]{2,}$/.test(formData.name)) {
      newErrors.name = "Name contains invalid characters.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (!/[\d+\-()\s]{7,}/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number.";
      valid = false;
    }
    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required.";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sanitized = {
      name: sanitize(form.name),
      email: sanitize(form.email),
      phone: sanitize(form.phone),
      institution: sanitize(form.institution),
    };
    setForm(sanitized);
    if (!validate(sanitized)) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/submit-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: sanitized.name,
          email: sanitized.email,
          phone: sanitized.phone,
          institution: sanitized.institution,
          sheet: "Registrations",
          type: "registration",
        }),
      });

      if (response.ok) {
        setToast({ message: "Registration submitted successfully!", type: "success" });
        setShowModal(true);
        setForm({ name: "", email: "", phone: "", institution: "" });
      } else {
        setToast({ message: "Error submitting registration. Please try again.", type: "error" });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setToast({ message: "Submission failed: " + message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="registration" className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
          Secure Your Spot
        </h2>
        <p className="text-blue-800 text-center mb-8">
          Be part of this exciting 2-day event. Fill out the form below to
          reserve your spot.
        </p>

        <form
          className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-blue-900 font-medium mb-1"
            >
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="pl-3 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-blue-900 font-medium mb-1"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="pl-3 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-blue-900 font-medium mb-1"
            >
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="pl-3 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
              placeholder="Your phone number"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Institution */}
          <div className="mb-4">
            <label
              htmlFor="institution"
              className="block text-blue-900 font-medium mb-1"
            >
              Institution<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              required
              className="pl-3 pr-4 py-3 w-full rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500 text-black"
              placeholder="Your institution"
              value={form.institution}
              onChange={handleChange}
            />
            {errors.institution && (
              <p className="text-red-500 text-xs mt-1">{errors.institution}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold shadow transition"
          >
            {submitting ? "Submitting..." : "Register"}
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Your information will only be used for event updates.
          </p>
        </form>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative animate-fadeIn">
            <h3 className="text-2xl font-bold text-blue-800 mb-2 text-center">
              Payment
            </h3>
            <p className="text-gray-700 text-center mb-1">
              Complete your payment with the following agents
            </p>
            
            <p className="text-gray-600 text-center mb-6">
              For Non-student you can pay to any agent</p>

            {/* Added price cards for Student and Non-student */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-center w-full sm:w-auto">
                <p className="text-sm text-gray-600">Student</p>
                <p className="text-xl font-bold text-blue-800">25,000 Tsh</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center w-full sm:w-auto">
                <p className="text-sm text-gray-600">Non-student</p>
                <p className="text-xl font-bold text-blue-800">50,000 Tsh</p>
              </div>
            </div>

            {/* Accordion Agent List */}
            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`border rounded-xl p-4 shadow-md cursor-pointer bg-white transition-all duration-300 ${
                    activeAgent === agent.id
                      ? "bg-blue-50 shadow-lg"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => handleToggle(agent.id)}
                >
                  <div className="flex items-center justify-between">
                    {/* Left: logo + network name */}
                    <div className="flex items-center gap-3">
                      <Image
                        src={agent.logo}
                        alt={agent.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <div>
                        <p className="font-semibold text-blue-900">
                          {agent.name}
                        </p>
                      </div>
                    </div>

                    {/* Right: agent contact name and payment number */}
                    <div className="text-right mr-3">
                      <p className="font-medium text-gray-800">
                        {agent.agentName}
                      </p>
                      <p className="text-sm text-gray-600">{agent.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </section>
  );
}
