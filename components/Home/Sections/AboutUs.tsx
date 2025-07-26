import Image from "next/image";
import SectionTitle from "../SectionTItle";
import Video from "../Video";

const services = [
  {
    title: "BEBIDAS",
    icon: "/assets/about-img/wine.png",
    link: "#bar",
  },
  {
    title: "ARTISTAS INVITADOS",
    icon: "/assets/about-img/hookah.png",
    link: "#hookah",
  },
  {
    title: "PISTA DE BAILE",
    icon: "/assets/about-img/dance-floor.png",
    link: "#dance",
  },
  {
    title: "ZONA VIP",
    icon: "/assets/about-img/vip.png",
    link: "#vip",
  },
];

const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative  w-full bg-[#0c0f22] text-white flex flex-col items-center justify-center pt-16"
    >
      <Image
        src="/assets/about_bg.png"
        alt="About Us Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
      />
      <div className="container text-center !mb-12">
        <SectionTitle title="¿Quiénes Somos?" subtitle="Cuban Party" />
        <p className="mt-6 max-w-2xl mx-auto text-gray-400 font-sans">
          Cuban Party es un proyecto dedicado a organizar fiestas y eventos
          únicos, llevando la auténtica experiencia cubana a diferentes lugares.
          Ofrecemos servicios exclusivos para que vivas la mejor fiesta,
          ¡nosotros llevamos la fiesta hasta ti!
        </p>
      </div>
      <div className="flex justify-center gap-3">
        {services.map(({ title, icon, link }) => (
          <span
            key={title}
            className="group flex flex-col items-center w-[200px] h-[179px] group"
          >
            <Image
              src={icon}
              alt={title}
              width={100}
              height={100}
              className="w-[100px] h-[100px]"
            />

            {/* el glow falso */}
            <div className="relative w-full">
              {/* Contenedor con el shine y el texto */}
              <div className="shine-hover flex justify-center items-center mt-3 relative overflow-hidden">
                <h2 className="relative pt-4 pb-[14.4px]  text-[var(--text-color1)] group-hover:text-shadow-[0_0_8px_#00fff7,0_0_16px_#00fff7] font-semibold text-2xl group-hover:text-[var(--text-color2)] transition-all duration-300">
                  {title}
                </h2>
              </div>
            </div>
          </span>
        ))}
      </div>

      <Image
        src="/assets/waves-pad.png"
        alt="Section Title Divider"
        width={1920}
        height={450}
        className="w-full mt-48"
      />
      <div className="absolute -bottom-30 left-0 right-0 w-full flex justify-center">
        <Video />
      </div>
    </section>
  );
};

export default AboutUs;
