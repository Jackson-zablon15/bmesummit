"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const galleryImages = [
  "/gallery (1).jpg",
  "/gallery (2).jpg",
  "/gallery (3).jpg",
  "/gallery (4).jpg",
  "/gallery (5).jpg",
  "/gallery (6).jpg",
  "/gallery (7).jpg",
  "/gallery (8).jpg",
  "/gallery (9).jpg",
  "/gallery (10).jpg",
  "/gallery (11).jpg",
  "/gallery (12).jpg",
  "/gallery (13).jpeg",
  "/gallery (14).jpeg",
  "/gallery (15).jpeg",
  "/gallery (16).jpeg",
  "/gallery (17).jpeg",
  "/gallery (18).jpeg",
  "/gallery (19).jpeg",
];

export default function Galleries() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const singleSetRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const activeImageRef = useRef<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const repeatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  useEffect(() => {
    activeImageRef.current = activeImage;
  }, [activeImage]);

  useEffect(() => {
    const track = trackRef.current;
    const singleSet = singleSetRef.current;

    if (!track || !singleSet) {
      return;
    }

    let lastTimestamp = 0;
    const pixelsPerSecond = 14;

    const applyOffset = () => {
      const singleSetWidth = singleSetRef.current?.offsetWidth ?? 0;

      if (!trackRef.current || singleSetWidth <= 0) {
        return;
      }

      while (offsetRef.current >= singleSetWidth) {
        offsetRef.current -= singleSetWidth;
      }

      while (offsetRef.current < 0) {
        offsetRef.current += singleSetWidth;
      }

      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    };

    const step = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      if (!isDraggingRef.current && !activeImageRef.current) {
        const delta = ((timestamp - lastTimestamp) / 1000) * pixelsPerSecond;
        offsetRef.current += delta;
        applyOffset();
      }

      lastTimestamp = timestamp;
      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    applyOffset();
    animationFrameRef.current = window.requestAnimationFrame(step);

    const resizeObserver = new ResizeObserver(() => {
      applyOffset();
    });

    resizeObserver.observe(singleSet);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activeImageRef.current) {
      return;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    dragDistanceRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const singleSetWidth = singleSetRef.current?.offsetWidth ?? 0;

    if (!isDraggingRef.current || singleSetWidth <= 0) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(deltaX));
    offsetRef.current = dragStartOffsetRef.current - deltaX;

    while (offsetRef.current >= singleSetWidth) {
      offsetRef.current -= singleSetWidth;
    }

    while (offsetRef.current < 0) {
      offsetRef.current += singleSetWidth;
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleImageClick = (image: string) => {
    if (dragDistanceRef.current > 8) {
      return;
    }

    setActiveImage((currentImage) => (currentImage === image ? null : image));
  };

  return (
    <section id="galleries" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-blue-900 md:text-4xl">
          Gallery
        </h2>
        <p className="mb-12 text-center text-blue-800">
          Take a look at the exciting gallery catalog.
        </p>

        <div
          className={`hide-scrollbar w-full overflow-hidden select-none touch-pan-y ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div ref={trackRef} className="flex w-max gap-6 py-2 will-change-transform">
            <div ref={singleSetRef} className="flex gap-6">
              {galleryImages.map((img, idx) => (
                <button
                  key={`set-a-${img}-${idx}`}
                  type="button"
                  className="inline-flex shrink-0"
                  onClick={() => handleImageClick(img)}
                  aria-label={`Open gallery item ${idx + 1}`}
                >
                  <span className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 shadow-md transition duration-300 hover:shadow-lg">
                    <Image
                      src={img}
                      alt={`Gallery item ${idx + 1}`}
                      width={420}
                      height={280}
                      className="h-auto max-h-[240px] w-auto max-w-[78vw] rounded-lg object-contain md:max-w-[360px]"
                      priority={idx === 0}
                      draggable={false}
                    />
                  </span>
                </button>
              ))}
            </div>

            {repeatedImages.slice(galleryImages.length).map((img, idx) => (
              <button
                key={`set-b-${img}-${idx}`}
                type="button"
                className="inline-flex shrink-0"
                onClick={() => handleImageClick(img)}
                aria-label={`Open gallery item ${idx + 1}`}
              >
                <span className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 shadow-md transition duration-300 hover:shadow-lg">
                  <Image
                    src={img}
                    alt={`Gallery item ${idx + 1}`}
                    width={420}
                    height={280}
                    className="h-auto max-h-[240px] w-auto max-w-[78vw] rounded-lg object-contain md:max-w-[360px]"
                    draggable={false}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="relative w-full max-w-5xl cursor-zoom-out"
            onClick={(event) => {
              event.stopPropagation();
              setActiveImage(null);
            }}
            aria-label="Collapse enlarged gallery image"
          >
            <Image
              src={activeImage}
              alt="Enlarged gallery item"
              width={1400}
              height={933}
              className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl"
              priority
            />
          </button>
        </div>
      )}
    </section>
  );
}
