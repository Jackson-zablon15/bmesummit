"use client";
import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose?: () => void;
  duration?: number;
};

export default function Toast({ message, type = "success", onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  const bg = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className={`fixed top-6 right-6 z-50 ${bg} text-white px-4 py-2 rounded shadow-lg`}>
      {message}
    </div>
  );
}
