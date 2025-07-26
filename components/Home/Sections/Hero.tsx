import AnimatedButton from "@/components/ui/Button";
import HeroBackground from "../HeroBackground";

const Hero = () => {
  return (
    <>
      <HeroBackground />
      <section className="flex flex-col items-center justify-center h-full text-center z-20 px-40 gap-10">
        <div className="relative z-20 flex flex-col items-center justify-center px-4 mb-10">
          <h1 className="font-extrabold mb-4 leading-tight">
            <span className="block text-[var(--text-color2)] text-4xl tracking-wider uppercase animate-fade-up delay-[200ms]">
              CUBANPARTY
            </span>
            <span className="block text-[var(--text-color1)] text-6xl md:text-[100px] uppercase leading-none animate-fade-up delay-[400ms]">
              REPARTOLATINO
            </span>
            <span className="block text-white text-4xl md:text-[70px] tracking-tight uppercase animate-fade-up delay-[600ms] -mt-7">
              Flow Cubano
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl animate-fade-up delay-[800ms] font-sans">
            Vive el ritmo y la energía latina en Uruguay. Disfruta fiestas
            únicas con la mejor música cubana y latina, shows en vivo, salsa,
            reggaetón, timba y reparto. Próximos eventos, tickets y toda la
            información en nuestras redes. ¡No te pierdas la experiencia Cuban
            Party en Montevideo!
          </p>
        </div>

        <div className="flex w-full justify-center gap-6 mb-10">
          <AnimatedButton
            className="bg-[var(--text-color1)] text-white hover:bg-[var(--text-color2)] hover:text-black"
            text="All Events"
            variants="secondary"
            size="lg"
          />
          <AnimatedButton
            className="bg-[var(--text-color2)] text-black hover:cursor-pointer"
            text="Buy Tickets"
            size="lg"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
