'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft,ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
interface Testimonial {
  name: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Patrick James",
    image: "/assets/testimonial-1.jpg",
    text: "Quisque sollicitudin feugiat risus, eu posuere ex euismod eu. Phasellus hendrerit, massa efficitur dapibus pulvinar.",
  },
  {
    name: "Lara Smith",
    image: "/assets/testimonial-2.jpg",
    text: "Vivamus euismod, sapien at fringilla feugiat, lorem ipsum pulvinar nisi, sed hendrerit massa justo eget velit.",
  },
  {
    name: "David Lee",
    image: "/assets/testimonial-3.jpg",
    text: "Pellentesque in velit at mauris eleifend rutrum. Aenean suscipit nisl sed lacus fermentum, nec mattis enim cursus.",
  },
  {
    name: "D",
    image: "/assets/testimonial-4.jpg",
    text: "Pellentesque in velit at mauris eleifend rutrum. Aenean suscipit nisl sed lacus fermentum, nec mattis enim cursus.",
  },
  {
    name: "L",
    image: "/assets/testimonial-5.jpg",
    text: "Pellentesque in velit at mauris eleifend rutrum. Aenean suscipit nisl sed lacus fermentum, nec mattis enim cursus.",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const forwardIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const backIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchXStart = useRef<number| null>(null);
  const touchXEnd = useRef<number|null>(null);

  //console.log(lastInteractionRef,idleTimeoutRef,forwardIntervalRef,backIntervalRef);

  const handleTouchStart = (e: React.TouchEvent)=>{
    touchXStart.current = e.touches[0].clientX;
  }

  const handleTouchEnd = (e:React.TouchEvent)=>{
    touchXEnd.current = e.changedTouches[0].clientX;
    const start = touchXStart.current;
    const end = touchXEnd.current;
    if(start !== null && end !==null){
        const distance = end - start;
        if(Math.abs(distance)>50){
            if(distance>0){
                handleManualClick(prev);
            }
            else handleManualClick(next);
        }
    }
  }

  const testimonial = testimonials[currentIndex];

  const resetInactivityTimer = () => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      startAutoPlay();
    }, 1000);
  };

  const stopAutoPlay = () => {
    if (forwardIntervalRef.current) {
      clearInterval(forwardIntervalRef.current);
      forwardIntervalRef.current = null;
    }
  };

  const stopAutoBack = () => {
    if (backIntervalRef.current) {
      clearInterval(backIntervalRef.current);
      backIntervalRef.current = null;
    }
  };

  const startAutoPlay = () => {
    if (forwardIntervalRef.current) return;
    forwardIntervalRef.current = setInterval(() => {
      setDirection("right");
      setTimeout(()=>{
        setCurrentIndex((prev) => {
        if (prev >= testimonials.length - 1) {
          stopAutoPlay();
          startAutoBack(); // iniciar retroceso
          return prev;
        }
        return prev + 1;
      });
      },1);
    }, 7000);
  };

  const startAutoBack = () => {
    if (backIntervalRef.current) return;
    backIntervalRef.current = setInterval(() => {
      setDirection("left");
      setTimeout(()=>{
        setCurrentIndex((prev) => {
        if (prev <= 0) {
          stopAutoBack();
          startAutoPlay();
          return prev;
        }
        return prev - 1;
      });
      },1);
    },90); // velocidad rápida
  };

  const handleManualClick = (callback: () => void) => {
    stopAutoPlay();
    stopAutoBack();
    resetInactivityTimer();
    callback();
  };

  const next = () => {
    setDirection("right");
    setTimeout(()=>{
        setCurrentIndex((prev) =>
      prev < testimonials.length - 1 ? prev + 1 : prev
    );
    },0.1)
  };

  const prev = () => {
    setDirection("left");
    setTimeout(()=>{
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    },0.1)
  };

  useEffect(() => {
    resetInactivityTimer();

    return () => {
      stopAutoPlay();
      stopAutoBack();
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);
  const isAutoBackActive = backIntervalRef.current !== null;

  return (
    <div className="overflow-hidden relative flex justify-items-center w-full max-w-6xl h-full mx-10">
      {/* Custom arrows */}
      <button
        onClick={()=>handleManualClick(prev)}
        className={cn(
          `hidden absolute left-2 h-12 w-12 bg-[var(--text-color1)] hover:bg-white hover:text-black hover:cursor-pointer top-1/2 -translate-y-1/2 sm:flex items-center justify-center rounded-none`,
          currentIndex === 0 && "bg-gray-700/30 pointer-events-none"
        )}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={()=> handleManualClick(next)}
        className={cn(
          `hidden absolute right-2 h-12 w-12 bg-[var(--text-color1)] hover:bg-white hover:text-black hover:cursor-pointer top-1/2 -translate-y-1/2 sm:flex items-center justify-center rounded-none`,
          currentIndex === testimonials.length - 1 &&
            "bg-gray-700/30 pointer-events-none"
        )}
      >
        <ChevronRight />
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.name}
          initial={
            direction === "right"
              ? { opacity: 0, x: 40 }
              : { opacity: 0, x: -40 }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={
            direction === "right"
              ? { opacity: 0, x: -40 }
              : { opacity: 0, x: 40 }
          }
          transition={{ duration: isAutoBackActive? 0.1:0.6 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex flex-col items-center gap-4 p-6 text-center w-full"
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={80}
            height={80}
            className=""
          />
          <h4 className="text-[var(--text-color1)] font-semibold">
            {testimonial.name}
          </h4>
          <p className="text-[var(--text-color2)] text-2xl font-[800] leading-relaxed max-w-xl">
            {testimonial.text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialCarousel;

