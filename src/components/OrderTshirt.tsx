"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function OrderTshirt() {
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        size: "Medium (MD)",
        color: "Light Blue",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, phone, size, color } = formData;

        // Construct the message
        // "My name is {name} and i have placed tshirt order for summit of size {size} color {color}. my phone number is {phone} redy to be sent"
        const message = `My name is ${name} and i have placed tshirt order for summit of size ${size} color ${color}. my phone number is ${phone} redy to be sent`;

        // WhatsApp URL
        // Phone number: 0769994654 -> Tanzania code +255 769 994 654
        // Removing the leading 0 and adding 255
        const phoneNumber = "255769994654";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, "_blank");

        // Close form and reset (optional)
        setShowOrderForm(false);
        setFormData({
            name: "",
            phone: "",
            size: "Medium (MD)",
            color: "Light Blue",
        });
    };

    return (
        <section id="order-tshirt" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                    Order Your T-Shirt Now
                </h2>
                <p className="text-blue-800 mb-10 max-w-2xl mx-auto">
                    Get your official BME Connect Summit t-shirt. Wear it with pride and represent the community!
                </p>

                <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <Image
                            src="/tshirt2.jpeg"
                            alt="Summit T-Shirt"
                            fill
                            className="object-contain bg-white"
                            sizes="(max-width: 768px) 100vw, 320px"
                            priority
                        />
                    </div>

                    <button
                        onClick={() => setShowOrderForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
                    >
                        Order Now
                    </button>
                </div>

                {/* Modal Form */}
                {showOrderForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setShowOrderForm(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold transition"
                                onClick={() => setShowOrderForm(false)}
                            >
                                &times;
                            </button>

                            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                                Place Your Order
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                <div>
                                    <label className="block text-blue-900 font-medium mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your name"
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-blue-900 font-medium mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="07XXXXXXXX"
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-blue-900 font-medium mb-1">
                                        Size
                                    </label>
                                    <select
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                                    >
                                        <option value="Small (SM)">Small (SM)</option>
                                        <option value="Medium (MD)">Medium (MD)</option>
                                        <option value="Large (L)">Large (L)</option>
                                        <option value="Extra Large (XL)">Extra Large (XL)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-blue-900 font-medium mb-1">
                                        Color
                                    </label>
                                    <select
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                                    >
                                        <option value="Light Blue">Light Blue</option>
                                        <option value="White">White</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow mt-4 transition flex items-center justify-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                    </svg>
                                    Send via WhatsApp
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
