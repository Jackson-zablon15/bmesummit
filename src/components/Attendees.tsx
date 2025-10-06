
"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Attendees() {
  const stats = [
    { number: "500+", label: "Members" },
    { number: "10+", label: "Startups" },
    { number: "5+", label: "Universities" },
    { number: "15+", label: "Hospitals" },
    { number: "20+", label: "Companies" },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // Helper to extract number from string like "500+"
  function getNumber(str: string) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  // Helper to get suffix (e.g. "+")
  function getSuffix(str: string) {
    const match = str.match(/\D+$/);
    return match ? match[0] : "";
  }

  return (
    <section id="attendees" className="bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
          Our Attendees
        </h2>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-5xl md:text-6xl font-extrabold text-blue-600">
                <CountUp
                  end={inView ? getNumber(stat.number) : 0}
                  duration={1.5}
                  suffix={getSuffix(stat.number)}
                  start={inView ? undefined : 0}
                />
              </p>
              <p className="text-lg md:text-xl text-blue-800 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
