"use client";

import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ModifiedEvent } from "@/lib/events";
import { useState, useEffect, useRef } from "react";

const PhotoSectionPerEvent = ({ event }: { event: ModifiedEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchXStart = useRef<number | null>(null);
  const touchXEnd = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchXStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchXEnd.current = e.changedTouches[0].clientX;
    const start = touchXStart.current;
    const end = touchXEnd.current;
    if (start !== null && end !== null) {
      const distance = end - start;
      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          showPrevImg();
        } else showNextImg;
      }
    }
  };
  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setActiveIndex(null);
  };

  const showNextImg = () => {
    if (activeIndex !== null && activeIndex < event.imgPerEvent.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const showPrevImg = () => {
    if (activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") showNextImg();
      if (e.key === "ArrowLeft") showPrevImg();
    };
    if (isModalOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, showNextImg, showPrevImg]);

  return (
    <section className="flex-1 w-full h-full bg-[#020416] text-white flex flex-col items-center justify-center py-20 px-10 lg:px-25">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-7">
        {event.imgPerEvent.map((img, i) => (
          <div
            onClick={() => handleImageClick(i)}
            key={i}
            className="relative group overflow-hidden shadow-lg hover:cursor-pointer hover:opacity-80 transition-all duration-10 aspect-square"
          >
            <span>
              <Image
                height={300}
                width={300}
                src={img}
                alt={`photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </span>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 bg-black/30 group-hover:scale-100 group-hover:opacity-100 rounded-full transition-all duration-300 p-4">
              <Search
                height={30}
                width={30}
                className="font-extrabold text-white"
              />
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && activeIndex !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          {/* Contenedor principal */}
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            {/* Botón Cerrar */}
            <button
              onClick={handleClose}
              className="absolute -top-8 -right-2 p-1 rounded-full text-white hover:text-red-400 transition"
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>

            {/* Imagen */}
            <Image
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              src={event.imgPerEvent[activeIndex]}
              alt={`Image ${activeIndex + 1}`}
              width={1000}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
              priority
            />

            {/* Conteo */}
            <div className="absolute bottom-2 right-4 text-white text-sm px-2 py-1">
              {activeIndex + 1} of {event.imgPerEvent.length}
            </div>

            {/* Botón Anterior */}
            {activeIndex > 0 && (
              <button
                onClick={showPrevImg}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-400 transition"
                aria-label="Prev"
              >
                <ChevronLeft size={40} />
              </button>
            )}

            {/* Botón Siguiente */}
            {activeIndex < event.imgPerEvent.length - 1 && (
              <button
                onClick={showNextImg}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-400 transition"
                aria-label="Next"
              >
                <ChevronRight size={40} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default PhotoSectionPerEvent;
