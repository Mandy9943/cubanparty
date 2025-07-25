const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0c0f22] text-white flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="text-center mb-12">
        <p className="text-pink-600 font-bold text-base tracking-widest uppercase">
          Welcome
        </p>
        <h2 className="text-5xl md:text-6xl font-extrabold text-white">
          About Our Club
        </h2>
        <div className="mt-6 flex justify-center">
          <div className="h-6 w-32 bg-no-repeat bg-contain" />
        </div>

        <p className="mt-6 max-w-xl mx-auto text-gray-400">
          Come discover our VIP experience with food, lounge, drinks, and dance
          floor. The ultimate party atmosphere awaits.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
