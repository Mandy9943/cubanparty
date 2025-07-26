import Link from "next/link";
import SectionTItle from "../SectionTItle";
import Image from "next/image";

const services = [
  {
    title: "BAR",
    icon: "/assets/about-img/wine.png",
    link: "#bar",
  },
  {
    title: "HOOKAH",
    icon: "/assets/about-img/hookah.png",
    link: "#hookah",
  },
  {
    title: "DANCE FLOOR",
    icon: "/assets/about-img/dance-floor.png",
    link: "#dance",
  },
  {
    title: "VIP ZONE",
    icon: "/assets/about-img/vip.png",
    link: "#vip",
  },
];

const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0c0f22] text-white flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="text-center mb-12">
        <SectionTItle title="About Our Club" subtitle="Welcome" />
        <p className="mt-6 max-w-xl mx-auto text-gray-400">
          Come discover our VIP experience with food, lounge, drinks, and dance
          floor. The ultimate party atmosphere awaits.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center w-full mx-auto mb-16">
        {services.map(({ title, icon, link }) => (
          <Link
            key={title}
            href={link}
            className="group flex flex-col items-center"
          >
            <Image src={icon} alt={title} width={100} height={100} />

            {/* el glow falso */}
            <div className="relative">
              {/* Blur de fondo que no se corta */}
              <div className="absolute inset-0 blur-md opacity-0 group-hover:opacity-20 bg-[var(--text-color2)] transition-all duration-300 pointer-events-none"></div>

              {/* Contenedor con el shine y el texto */}
              <div className="shine-hover flex justify-center items-center mt-3 relative overflow-hidden">
                <h2 className="relative text-[var(--text-color1)] font-semibold text-2xl group-hover:text-[var(--text-color2)] transition-all duration-300">
                  {title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
