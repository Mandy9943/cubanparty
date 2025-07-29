import SectionTItle from "../SectionTItle";
import TestimonialCarousel from "../TestimonialCarousel";
import AnimatedButton from "@/components/ui/Button";
import Image from "next/image";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative py-16 md:px-10 bg-[#0c0f22] text-white text-center flex flex-col items-center justify-center"
    >
      <Image
        src="/assets/parallax-2.jpg"
        alt="A radio img as a background"
        layout="fill"
        priority
        quality={100}
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-70"
      />
      <SectionTItle title="Testimonials" subtitle="What our clients say" />
      <TestimonialCarousel />
      <AnimatedButton className="!z-10" text="Leer Más" />
    </section>
  );
};
export default Testimonials;