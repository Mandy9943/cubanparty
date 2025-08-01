import AnimatedButton from "@/components/ui/Button";
import HeroBackground from "../HeroBackground";

const Hero = () => {
  return (
    <>
      <HeroBackground />
      <section className="flex flex-col items-center justify-center h-full text-center z-20 pt-10 px-4 md:px-40 gap-6 md:gap-10">
        <div className="relative z-20 flex flex-col items-center justify-center px-2 md:px-4 my-6 md:my-10">
          <h1 className="font-extrabold my-4 leading-tight">
            <span className="block text-[var(--text-color2)] text-2xl md:text-4xl tracking-wider uppercase animate-fade-up delay-[200ms]">
              CUBANPARTY
            </span>
            <span className="block text-[var(--text-color1)] text-4xl md:text-6xl lg:text-[100px] uppercase leading-none animate-fade-up delay-[400ms]">
              REPARTOLATINO
            </span>
            <span className="block text-white text-3xl md:text-4xl lg:text-[70px] tracking-tight uppercase animate-fade-up delay-[600ms] -mt-2 md:-mt-7">
              Flow Cubano
            </span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-gray-300 max-w-2xl animate-fade-up delay-[800ms] font-sans px-4 md:px-0">
            Vive el ritmo y la energía latina en Uruguay. Disfruta fiestas
            únicas con la mejor música cubana y latina, shows en vivo, salsa,
            reggaetón, timba y reparto. Próximos eventos, tickets y toda la
            información en nuestras redes. ¡No te pierdas la experiencia Cuban
            Party en Montevideo!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full justify-center gap-4 sm:gap-6 mb-6 md:mb-10 px-4 md:px-0">
          <AnimatedButton
            className="bg-[var(--text-color2)] text-white hover:bg-[var(--text-color2)] hover:text-black w-full sm:w-auto"
            text="Eventos"
            variants="secondary"
            size="lg"
          />
          <a
            href="https://www.passline.com/eventos/nostalgia-a-lo-cubano?fbclid=PAZXh0bgNhZW0CMTEAAafqmJZ_0tZx7zO5wPW2wE6M6nivvUTLYv7wmm8LRgUZvhfwwyy4JHyiDCPKIQ_aem_7bboxqvfcP5flxiRfX7v1g"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedButton
              className="bg-[var(--text-color1)] text-black hover:cursor-pointer w-full sm:w-auto"
              text="Comprar Entradas"
              size="lg"
            />
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
