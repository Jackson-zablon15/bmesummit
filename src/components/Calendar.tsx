"use client";

import { useState } from "react";

type ScheduleItem = {
  time: string;
  duration: string;
  session: string;
  type: string;
  responsible: string;
};

const schedule: Record<"day1" | "day2", { label: string; title: string; items: ScheduleItem[] }> = {
  day1: {
    label: "Day 1",
    title: "Day One - Official Launch Day",
    items: [
      { time: "9:00 - 9:30 AM", duration: "30 min", session: "Arrival & Registration", type: "Admin", responsible: "ALL" },
      { time: "9:30 - 10:00 AM", duration: "30 min", session: "Breakfast", type: "Break", responsible: "Organizing Committee" },
      { time: "10:00 - 10:10 AM", duration: "10 min", session: "Icebreaker #1", type: "Icebreaker", responsible: "MC" },
      { time: "10:10 - 10:30 AM", duration: "20 min", session: "Opening Remarks", type: "Plenary", responsible: "TABESA Chairperson" },
      { time: "10:30 - 11:00 AM", duration: "30 min", session: "Speech on TABESA", type: "Plenary", responsible: "TABESA Chairperson" },
      { time: "11:00 - 11:20 AM", duration: "20 min", session: "Keynote Speech #1", type: "Keynote", responsible: "Invited Speaker 1" },
      { time: "11:20 - 11:35 AM", duration: "15 min", session: "Sponsor Presentation #1", type: "Sponsor", responsible: "Sponsor Rep. 1" },
      { time: "11:35 - 11:50 AM", duration: "20 min", session: "Keynote Speech #2", type: "Keynote", responsible: "Invited Speaker 2" },
      { time: "11:50 - 12:05 PM", duration: "15 min", session: "Sponsor Presentation #2", type: "Sponsor", responsible: "Sponsor Rep. 2" },
      { time: "12:05 - 12:15 PM", duration: "10 min", session: "Icebreaker #2", type: "Icebreaker", responsible: "MC" },
      { time: "12:15 - 12:35 PM", duration: "20 min", session: "Keynote Speech #3", type: "Keynote", responsible: "Invited Speaker 3" },
      { time: "12:35 - 12:50 PM", duration: "15 min", session: "Sponsor Presentation #3", type: "Sponsor", responsible: "Sponsor Rep. 3" },
      { time: "12:50 - 1:35 PM", duration: "45 min", session: "Innovation Pitching", type: "Plenary", responsible: "Ifakara Innovation Hub" },
      { time: "1:35 - 2:05 PM", duration: "30 min", session: "Exhibition Visit", type: "Activity", responsible: "ALL" },
      { time: "2:05 - 2:45 PM", duration: "40 min", session: "Lunch", type: "Break", responsible: "ALL" },
      { time: "2:45 - 3:05 PM", duration: "20 min", session: "Address by Guest of Honour", type: "Special", responsible: "Guest of Honour" },
      { time: "3:05 - 3:25 PM", duration: "20 min", session: "Official Launch of TABESA", type: "Official Launch", responsible: "Guest of Honour" },
      { time: "3:25 - 3:45 PM", duration: "20 min", session: "Awards Ceremony", type: "Special", responsible: "Organizing Committee" },
      { time: "3:45 - 3:52 PM", duration: "7 min", session: "Group Photo", type: "Activity", responsible: "ALL" },
      { time: "3:52 - 4:00 PM", duration: "8 min", session: "Closing Remarks - Day 1", type: "Plenary", responsible: "TABESA Chairperson" },
    ],
  },
  day2: {
    label: "Day 2",
    title: "Day Two - TABESA Governance & Knowledge Day",
    items: [
      { time: "9:00 - 9:25 AM", duration: "25 min", session: "Arrival & Registration", type: "Admin", responsible: "ALL" },
      { time: "9:25 - 9:55 AM", duration: "30 min", session: "Breakfast", type: "Break", responsible: "Organizing Committee" },
      { time: "9:55 - 10:05 AM", duration: "10 min", session: "Icebreaker #1", type: "Icebreaker", responsible: "MC / Facilitator" },
      { time: "10:05 - 10:25 AM", duration: "20 min", session: "Opening Remarks", type: "Plenary", responsible: "TABESA Chairperson" },
      { time: "10:25 - 10:45 AM", duration: "20 min", session: "Keynote Speech #1", type: "Keynote", responsible: "Invited Speaker 1" },
      { time: "10:45 - 11:00 AM", duration: "15 min", session: "Sponsor Presentation #1", type: "Sponsor", responsible: "Sponsor Rep. 1" },
      { time: "11:00 - 11:20 AM", duration: "20 min", session: "Keynote Speech #2", type: "Keynote", responsible: "Invited Speaker 2" },
      { time: "11:20 - 11:35 AM", duration: "15 min", session: "Sponsor Presentation #2", type: "Sponsor", responsible: "Sponsor Rep. 2" },
      { time: "11:35 - 11:45 AM", duration: "10 min", session: "Icebreaker #2", type: "Icebreaker", responsible: "MC / Facilitator" },
      { time: "11:45 - 12:05 PM", duration: "20 min", session: "Keynote Speech #3", type: "Keynote", responsible: "Invited Speaker 3" },
      { time: "12:05 - 12:20 PM", duration: "15 min", session: "Sponsor Presentation #3", type: "Sponsor", responsible: "Sponsor Rep. 3" },
      { time: "12:20 - 12:40 PM", duration: "20 min", session: "Keynote Speech #4", type: "Keynote", responsible: "Invited Speaker 4" },
      { time: "12:40 - 12:55 PM", duration: "15 min", session: "Sponsor Presentation #4", type: "Sponsor", responsible: "Sponsor Rep. 4" },
      { time: "12:55 - 1:25 PM", duration: "30 min", session: "Exhibition Visit", type: "Activity", responsible: "Exhibition Coordinator" },
      { time: "1:25 - 2:05 PM", duration: "40 min", session: "Lunch", type: "Break", responsible: "Logistics Team" },
      { time: "2:05 - 2:35 PM", duration: "30 min", session: "Constitution Amendment of TABESA", type: "Special", responsible: "TABESA Secretary" },
      { time: "2:35 - 3:00 PM", duration: "25 min", session: "TABESA Branches Presentation", type: "Plenary", responsible: "Branch Representatives" },
      { time: "3:00 - 3:30 PM", duration: "30 min", session: "Election of TABESA Leaders", type: "Special", responsible: "Electoral Committee" },
      { time: "3:30 - 3:48 PM", duration: "18 min", session: "Panel Discussion", type: "Plenary", responsible: "Moderator" },
      { time: "3:48 - 3:54 PM", duration: "6 min", session: "Group Photo", type: "Activity", responsible: "MC" },
      { time: "3:54 - 4:00 PM", duration: "6 min", session: "Closing Remarks - Day 2", type: "Plenary", responsible: "TABESA Chairperson" },
    ],
  },
};

export default function Calendar() {
  const [activeDay, setActiveDay] = useState<"day1" | "day2">("day1");
  const [showFullTimetable, setShowFullTimetable] = useState(false);
  const previewRowCount = 6;
  const visibleItems = showFullTimetable
    ? schedule[activeDay].items
    : schedule[activeDay].items.slice(0, previewRowCount);

  return (
    <section id="calendar" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-3 text-center text-3xl font-bold text-blue-900 md:text-4xl">
          Program Schedule
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-blue-800">
          1st BME Connect Summit official programme timetable. Venue: Santika Hall, Mwenge DSM.
          Daily sessions run from 9:00 AM to 4:00 PM.
        </p>

        <div className="mb-6 flex justify-center gap-3">
          {(Object.keys(schedule) as Array<keyof typeof schedule>).map((dayKey) => (
            <button
              key={dayKey}
              type="button"
              onClick={() => {
                setActiveDay(dayKey);
                setShowFullTimetable(false);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition md:text-base ${
                activeDay === dayKey
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-white text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50"
              }`}
            >
              {schedule[dayKey].label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg">
          <div className="border-b border-blue-100 bg-blue-50 px-5 py-4 sm:px-6">
            <h3 className="text-lg font-bold text-blue-900 sm:text-xl">
              {schedule[activeDay].title}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">Time</th>
                  <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">Duration</th>
                  <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">Session</th>
                  <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">Responsible</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item) => (
                  <tr key={`${activeDay}-${item.time}-${item.session}`} className="border-b border-blue-100 even:bg-blue-50/50">
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-blue-900">
                      {item.time}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                      {item.duration}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {item.session}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {item.responsible}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {schedule[activeDay].items.length > previewRowCount && (
            <div className="border-t border-blue-100 bg-white px-5 py-4 text-center">
              <button
                type="button"
                onClick={() => setShowFullTimetable((current) => !current)}
                className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                {showFullTimetable ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
