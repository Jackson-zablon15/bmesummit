"use client";
import React, { useState } from "react";
import Image from "next/image";
import Toast from "./Toast";

export default function Essay() {
    const MAX_PDF_SIZE_BYTES = 7 * 1024 * 1024;
    const [showEssayForm, setShowEssayForm] = useState(false);

    const [essayForm, setEssayForm] = useState<{
        fullname: string;
        institution: string;
        phone: string;
        email: string;
        title: string;
    }>({ fullname: "", institution: "", phone: "", email: "", title: "" });
    const [essayFile, setEssayFile] = useState<File | null>(null);

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({ name: "", file: "" });
    const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files?.[0] || null;
            setEssayFile(file);
            setErrors((prev) => ({ ...prev, file: "" }));
            return;
        }
        setEssayForm((f) => ({ ...f, [name]: value }));
    }

    function validate(form: { name: string; file: File | null }) {
        let valid = true;
        const newErrors = { name: "", file: "" };
        if (!form.name.trim()) {
            newErrors.name = "Title is required.";
            valid = false;
        }
        if (!form.file) {
            newErrors.file = "PDF file is required.";
            valid = false;
        } else if (form.file.type !== "application/pdf") {
            newErrors.file = "Only PDF files are allowed.";
            valid = false;
        } else if (form.file.size > MAX_PDF_SIZE_BYTES) {
            newErrors.file = "PDF is too large. Please upload a file smaller than 7 MB.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result !== "string") {
                    reject(new Error("Failed to read file."));
                    return;
                }
                const base64 = result.split(",")[1];
                resolve(base64 || "");
            };
            reader.onerror = () => reject(new Error("Could not read PDF file."));
            reader.readAsDataURL(file);
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = essayForm;

        if (validate({ name: formData.title, file: essayFile })) {
            setSubmitting(true);

            try {
                const pdfBase64 = essayFile ? await fileToBase64(essayFile) : "";
                const body = {
                    fullname: formData.fullname,
                    institution: formData.institution,
                    phone: formData.phone,
                    email: formData.email,
                    title: formData.title,
                    description: "",
                    sheet: "Essays",
                    type: "essay",
                    pdfName: essayFile?.name || "",
                    pdfMimeType: essayFile?.type || "application/pdf",
                    pdfBase64,
                };

                const response = await fetch("/api/submit-essay", {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    setToast({ message: "Essay application submitted successfully!", type: "success" });
                    setEssayForm({ fullname: "", institution: "", phone: "", email: "", title: "" });
                    setEssayFile(null);
                    setShowEssayForm(false);
                } else {
                    let backendMessage = "Error submitting application. Please try again.";
                    try {
                        const data = (await response.json()) as { message?: string };
                        if (data?.message) backendMessage = data.message;
                    } catch {
                        // ignore parse errors and use default message
                    }
                    setToast({ message: backendMessage, type: "error" });
                }
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                setToast({ message: "Submission failed: " + message, type: "error" });
            } finally {
                setSubmitting(false);
            }
        }
    }

    return (
        <div className="mt-20 py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
                    Essay Competition
                </h2>
                <p className="text-blue-800 text-center mb-10">
                    Share your insights and perspectives. Participate in our essay competition to voice your ideas on the future of biomedical engineering.
                </p>

                <div className="flex justify-center">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 flex flex-col w-full max-w-sm">
                        <div className="w-full h-48 relative">
                            {/* Using a placeholder image or training.jpg if available */}
                            <Image
                                src="/training.jpg"
                                alt="Essay Competition"
                                fill
                                className="object-cover rounded-t-xl"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                Essay Question
                            </h3>
                            <p className="text-blue-800 text-sm">
                             In the age of AI and the pursuit of sustainability, what does it truly mean to 'engineer health equity' for Africa's future? Drawing from the summit's theme and sub-themes, identify a pressing healthcare challenge in an African context and propose a biomedical engineering-driven solution that is innovative, contextually appropriate, and sustainable.   
                            </p>
                            <div className="mt-4">
                                <details className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                                    <summary className="text-blue-900 font-medium cursor-pointer">
                                        Guidelines
                                    </summary>
                                    <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-blue-900">
                                        <li>Open to BME students in Tanzania registered for 2025/2026.</li>
                                        <li>Write in English and keep the essay between 1,000 and 1,200 words.</li>
                                        <li>Submit both PDF file.</li>
                                        <li>Use Times New Roman, font size 12, and 1.5 line spacing.</li>
                                        <li>
                                            File name format: <code>Summit2026_YourName_UniversityAbbreviation</code>.
                                        </li>
                                        <li>
                                            Include on the first page: essay title, official essay question, short bio
                                            (max 50 words), and contact details.
                                        </li>
                                        <li>Submit original work only; plagiarism leads to disqualification.</li>
                                        <li>AI-generated essay content is not allowed.</li>
                                        <li>
                                            Cite all external facts/ideas using a consistent style (APA 7th or MLA 9th)
                                            and include references.
                                        </li>
                                        <li>
                                            Submission opens March 1, 2026 and closes April 24, 2026 at 11:59 PM EAT.
                                        </li>
                                    </ul>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold cursor-pointer transition"
                        onClick={() => setShowEssayForm(true)}
                    >
                        Apply for Essay Competition
                    </button>
                </div>

                {showEssayForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                        onClick={() => setShowEssayForm(false)}
                    >
                        <form
                            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn max-h-[90vh] overflow-y-auto"
                            onSubmit={handleSubmit}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-blue-900 text-2xl font-bold hover:text-blue-600 cursor-pointer"
                                onClick={() => setShowEssayForm(false)}
                                aria-label="Close"
                            >
                                ×
                            </button>
                            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
                                Apply for Essay Competition
                            </h3>

                            <div className="space-y-3">
                                <label className="block">
                                    <span className="block text-blue-900 font-medium mb-1">Full name</span>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={essayForm.fullname}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your full name"
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                                    />
                                </label>

                                <label className="block">
                                    <span className="block text-blue-900 font-medium mb-1">Institution</span>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={essayForm.institution}
                                        onChange={handleChange}
                                        required
                                        placeholder="Organization / Institution"
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                                    />
                                </label>

                                <label className="block">
                                    <span className="block text-blue-900 font-medium mb-1">Phone Number</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={essayForm.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your phone number"
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                                    />
                                </label>

                                <label className="block">
                                    <span className="block text-blue-900 font-medium mb-1">Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={essayForm.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your email address"
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                                    />
                                </label>

                                <label className="block">
                                    <span className="block text-blue-900 font-medium mb-1">Title</span>
                                    <input
                                        type="text"
                                        name="title"
                                        value={essayForm.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="Essay title"
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </label>

                                <label className="block">
                                    <span className="block text-blue-900 font-medium mb-1">Upload Essay (PDF)</span>
                                    <input
                                        type="file"
                                        name="essayFile"
                                        accept="application/pdf,.pdf"
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-black"
                                    />
                                    {errors.file && (
                                        <p className="text-red-500 text-xs mt-1">{errors.file}</p>
                                    )}
                                </label>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg py-2 mt-4 transition cursor-pointer"
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
        </div>
    );
}
