import SectionTItle from "../SectionTItle";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative py-16 bg-[#0c0f22] text-white text-center flex flex-col items-center justify-center"
    >
      <SectionTItle title="Testimonials" subtitle="What our clients say" />
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-8">
          "Cuban Party is the best! The atmosphere, the music, and the people
          are all amazing. I can't wait to come back!"
        </p>
        <p className="text-lg mb-8">
          "An unforgettable experience! The energy was incredible, and I made
          so many new friends."
        </p>
      </div>
    </section>
  );
}
export default Testimonials;