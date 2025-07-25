import HeroBackground from "../HeroBackground";

const Hero = () => {
  return (
    <>
      <HeroBackground />
      <section className="flex flex-col items-center justify-center h-full text-center z-20 px-40 gap-10">
        <div className="relative z-20 flex flex-col items-center justify-center px-4">
          <h1 className="font-extrabold mb-4 leading-tight">
            <span className="block text-[var(--text-color2)] text-4xl md:text-5xl tracking-wider uppercase animate-fade-up delay-[200ms]">
              Vibra
            </span>
            <span className="block text-[var(--text-color1)] text-7xl md:text-9xl leading-none animate-fade-up delay-[400ms]">
              La Noche
            </span>
            <span className="block text-white text-5xl md:text-6xl tracking-tight animate-fade-up delay-[600ms]">
              En Montevideo
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-xl mt-2 animate-fade-up delay-[800ms]">
            Música. Tragos. Buenas vibras. Todo en un solo lugar.
          </p>
        </div>

        <div className="flex w-full justify-center gap-6 mb-10">
          <a className="ripple-outer bg-[var(--text-color1)] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[var(--text-color2)] hover:text-black hover:cursor-pointer transition-colors duration-300">
            <span>All Events</span>
          </a>
          <a className="ripple-outer bg-[var(--text-color2)] text-black px-6 py-3 rounded-lg shadow-lg hover:cursor-pointer">
            <span>Buy Tickets</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
