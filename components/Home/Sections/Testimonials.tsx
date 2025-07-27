import SectionTItle from "../SectionTItle";
import TestimonialCarousel from "../TestimonialCarousel";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative py-16 bg-[#0c0f22] text-white text-center flex flex-col items-center justify-center"
    >
      <SectionTItle title="Testimonials" subtitle="What our clients say" />
      <TestimonialCarousel/>

    </section>
  );
}
export default Testimonials;