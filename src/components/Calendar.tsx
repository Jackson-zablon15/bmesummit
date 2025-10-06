// components/Calendar.tsx
"use client";
import { useState } from "react";

const schedule = {
  day1: [
    { time: "09:00 AM – 10:00 AM", title: "Opening Ceremony" },
    { time: "10:30 AM – 12:00 PM", title: "Keynote: Future of Biomedical Engineering" },
    { time: "01:00 PM – 03:00 PM", title: "Panel Discussion: Innovation in Healthcare Tech" },
    { time: "03:30 PM – 05:00 PM", title: "Networking Session" },
  ],
  day2: [
    { time: "09:00 AM – 10:30 AM", title: "Workshop: Biomedical Devices" },
    { time: "11:00 AM – 12:30 PM", title: "Pitch Competition" },
    { time: "01:30 PM – 03:00 PM", title: "Research Presentations" },
    { time: "03:30 PM – 05:00 PM", title: "Closing Ceremony" },
  ],
};

export default function Calendar() {
  const [activeDay, setActiveDay] = useState<"day1" | "day2">("day1");

  return (
    <section id="calendar" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Program Schedule
        </h2>

        {/* Tabs (commented out for future use) */}
        {false && (
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveDay("day1")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeDay === "day1"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Day 1
            </button>
            <button
              onClick={() => setActiveDay("day2")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeDay === "day2"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Day 2
            </button>
          </div>
        )}

        {/* Timeline (commented out for future use) */}
        {false && (
          <div className="relative">
            {/* Vertical line at start */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-200"></div>

            <div className="space-y-8">
              {schedule[activeDay].map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-stretch bg-white shadow-md rounded-lg overflow-hidden"
                >
                  {/* Dot at start */}
                  <div className="flex items-center justify-center" style={{ width: '48px', minWidth: '48px' }}>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                  </div>
                  {/* Time Section - reduced width, full height, centered */}
                  <div className="flex items-center justify-center bg-blue-50 px-2" style={{ width: '120px', minWidth: '120px' }}>
                    <p className="text-sm font-semibold text-blue-700 text-center">{item.time}</p>
                  </div>
                  {/* Details Section */}
                  <div className="flex-1 px-6 py-4 flex flex-col justify-center">
                    <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">Details coming soon...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center h-32">
          <span className="text-xl text-blue-700 font-semibold">To be released soon</span>
        </div>
      </div>
    </section>
  );
}
