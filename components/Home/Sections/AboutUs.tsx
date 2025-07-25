import SectionTItle from "../SectionTItle";

const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0c0f22] text-white flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="text-center mb-12">
        <SectionTItle title="About Our Club" subtitle="Welcome"/>
        <p className="mt-6 max-w-xl mx-auto text-gray-400">
          Come discover our VIP experience with food, lounge, drinks, and dance
          floor. The ultimate party atmosphere awaits.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
