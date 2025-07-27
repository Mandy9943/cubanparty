import SectionTItle from "../SectionTItle";
import TestimonialCarousel from "../TestimonialCarousel";
import AnimatedButton from "@/components/ui/Button";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative py-16 md:px-10 bg-[#0c0f22] text-white text-center flex flex-col items-center justify-center"
    >
      <SectionTItle title="Testimonials" subtitle="What our clients say" />
      <TestimonialCarousel/>
        <AnimatedButton className="!z-10" text="Leer Más" />
    </section>
  );
}
export default Testimonials;