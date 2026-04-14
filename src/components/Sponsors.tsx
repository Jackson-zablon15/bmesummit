"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type CardItem = {
  name: string;
  logo: string;
};

const studentStartups: CardItem[] = [
  {
    name: "Cotronix",
    logo: "/cotronix.jpg",
  },
  {
    name: "ChuoMarket",
    logo: "/chuomarket.png",
  },
  {
    name: "Flowtera",
    logo: "/flowtera.png",
  },
];

const sponsors: CardItem[] = [
  {
    name: "Hyper Med",
    logo: "/hyperMed.jpg",
  },
  {
    name: "GloryRoof",
    logo: "/gloryroof.jpg",
  },
];

function DraggableMarquee({
  items,
  imageSize,
  imageClassName,
}: {
  items: CardItem[];
  imageSize: number;
  imageClassName: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const repeatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let lastTimestamp = 0;
    const pixelsPerSecond = 38;

    const step = (timestamp: number) => {
      if (!containerRef.current) {
        return;
      }

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const singleSetWidth = containerRef.current.scrollWidth / 3;

      if (!isDraggingRef.current && singleSetWidth > 0) {
        const delta = ((timestamp - lastTimestamp) / 1000) * pixelsPerSecond;
        containerRef.current.scrollLeft += delta;

        if (containerRef.current.scrollLeft >= singleSetWidth * 2) {
          containerRef.current.scrollLeft -= singleSetWidth;
        }
      }

      lastTimestamp = timestamp;
      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    container.scrollLeft = container.scrollWidth / 3;
    animationFrameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [items]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = container.scrollLeft;
    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container || !isDraggingRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;
    container.scrollLeft = dragStartScrollRef.current - deltaX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    if (container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`hide-scrollbar overflow-x-auto w-full select-none touch-pan-y ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="flex min-w-max gap-6 whitespace-nowrap py-1">
        {repeatedItems.map((item, idx) => (
          <div key={`${item.name}-${idx}`} className="inline-block">
            <div className="flex w-[220px] flex-col items-center justify-center rounded-2xl border border-blue-100 bg-white px-6 py-4 shadow-md transition hover:shadow-lg">
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={imageSize}
                height={imageSize}
                className={imageClassName}
                draggable={false}
              />
              <div className="mt-1 text-center text-base font-semibold leading-tight text-blue-900">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SponsorsSection() {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <>
      <section className="bg-blue-50 px-4 pt-16 pb-8">
        <h2 className="mb-10 text-center text-3xl font-bold text-blue-900 md:text-4xl">
          Our Sponsors
        </h2>

        <DraggableMarquee
          items={sponsors}
          imageSize={160}
          imageClassName="mb-1 h-36 w-36 rounded-xl object-contain"
        />

        <div className="relative mt-24 flex h-16 justify-center">
          <div
            className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-0"
            style={{ pointerEvents: showIcons ? "auto" : "none" }}
          >
            <a
              href="mailto:info@bmesummit.org"
              className={`mb-2 flex items-center justify-center rounded-full border border-blue-200 bg-white p-3 text-blue-800 shadow-lg transition-all duration-500 ease-in-out
                ${showIcons ? "opacity-100 -translate-x-12 -translate-y-16 rotate-[-18deg]" : "translate-x-0 translate-y-0 rotate-0 opacity-0"}`}
              style={{ transitionDelay: showIcons ? "100ms" : "0ms" }}
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="4" width="20" height="16" rx="4" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>

            <a
              href="https://wa.me/+255758758153"
              className={`flex items-center justify-center rounded-full border border-green-200 bg-white p-3 text-green-600 shadow-lg transition-all duration-500 ease-in-out
                ${showIcons ? "opacity-100 translate-x-12 -translate-y-16 rotate-[18deg]" : "translate-x-0 translate-y-0 rotate-0 opacity-0"}`}
              style={{ transitionDelay: showIcons ? "250ms" : "0ms" }}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#25D366" />
                <path
                  d="M16 7.5c-4.7 0-8.5 3.7-8.5 8.3 0 1.5.4 2.9 1.1 4.1L7 25l5.3-1.4c1.2.6 2.5.9 3.7.9 4.7 0 8.5-3.7 8.5-8.3S20.7 7.5 16 7.5zm0 15c-1.2 0-2.3-.3-3.3-.8l-.2-.1-3.1.8.8-3-.2-.3c-.7-1.1-1-2.3-1-3.6 0-3.7 3.2-6.7 7-6.7s7 3 7 6.7-3.2 6.7-7 6.7zm4-5.1c-.2-.1-1.2-.6-1.3-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.5-.9-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.3 0-.4.2-.1.2-.5.5-.5 1.2s.5 1.4.6 1.5c.1.1 1.1 1.7 2.7 2.3 1.6.6 1.6.4 1.9.4.3 0 .9-.4 1-.8.1-.4.1-.7.1-.8 0-.1-.1-.1-.2-.2z"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>

          <button
            className="relative z-20 rounded-full bg-blue-800 px-8 py-2 text-base font-bold text-white shadow transition hover:bg-blue-900"
            style={{ height: "40px" }}
            onClick={() => setShowIcons((value) => !value)}
          >
            Become a Sponsor
          </button>
        </div>
      </section>

      <section className="bg-blue-50 px-4 pt-8 pb-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-blue-900 md:text-4xl">
          Students Startups
        </h2>

        <DraggableMarquee
          items={studentStartups}
          imageSize={150}
          imageClassName="mb-1 h-32 w-32 rounded-full object-contain"
        />
      </section>
    </>
  );
}
