'use client'
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft,ChevronRight } from "lucide-react";
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
    image: "/assets/testimonials-1.jpg",
    text: "Vivamus euismod, sapien at fringilla feugiat, lorem ipsum pulvinar nisi, sed hendrerit massa justo eget velit.",
  },
  {
    name: "David Lee",
    image: "/assets/testimonials-1.jpg",
    text: "Pellentesque in velit at mauris eleifend rutrum. Aenean suscipit nisl sed lacus fermentum, nec mattis enim cursus.",
  },
  {
    name: "D",
    image: "/assets/testimonials-1.jpg",
    text: "Pellentesque in velit at mauris eleifend rutrum. Aenean suscipit nisl sed lacus fermentum, nec mattis enim cursus.",
  },
  {
    name: "L",
    image: "/assets/testimonials-1.jpg",
    text: "Pellentesque in velit at mauris eleifend rutrum. Aenean suscipit nisl sed lacus fermentum, nec mattis enim cursus.",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonial = testimonials[currentIndex];
  console.log(testimonial, currentIndex);
  const next = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? prev : prev + 1
    );
  };
  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  return (
    <div className="relative flex justify-items-center w-ful mx-auto p-20">
      {/* Custom arrows */}
      <button
        onClick={prev}
        className="absolute left-0 h-10 w-10 bg-[var(--text-color1)] top-[50%] flex items-center justify-center rounded-md"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-0 h-10 w-10 bg-[var(--text-color1)] top-[50%] flex items-center justify-center rounded-md"
      >
        <ChevronRight />
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 p-6 text-center"
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
          <p className="text-[var(--text-color2)] text-lg leading-relaxed max-w-xl">
            {testimonial.text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialCarousel;

