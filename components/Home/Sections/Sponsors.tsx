import Image from "next/image";
import SectionTitle from "../SectionTItle";

const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      image: "/assets/sponsors/1.png",
      alt: "Patrocinador 1",
      link: "https://www.instagram.com/yosbelitogarcia?igsh=MXFoampobHJkczY1cg%3D%3D",
    },
    {
      id: 2,
      image: "/assets/sponsors/2.webp",
      alt: "Patrocinador 2",
      link: "https://www.instagram.com/dondelola.uy?igsh=dzdseGgzeXJvMXVn",
    },
    {
      id: 3,
      image: "/assets/sponsors/3.png",
      alt: "Patrocinador 3",
      link: "https://www.instagram.com/justo_refuerzos?igsh=N3ZibXUzM2oxOWE5",
    },
    {
      id: 4,
      image: "/assets/sponsors/4.png",
      alt: "Patrocinador 4",
      link: "https://www.instagram.com/dulcesfermin?igsh=cHh1ODd5eDJicnNs",
    },
  ];

  return (
    <section
      id="sponsors"
      className="relative w-full bg-[#0c0f22] text-white flex flex-col items-center justify-center pt-16 pb-20"
    >
      <div className="container text-center">
        <SectionTitle title="Socios" subtitle="Aliados estratégicos" />
        <p className="mt-6 max-w-2xl mx-auto text-gray-400 font-sans text-sm md:text-base px-4 md:px-0 mb-12">
          Agradecemos a todas las empresas que confían en Cuban Party y nos
          apoyan para hacer realidad los mejores eventos de música latina en
          Uruguay.
        </p>
      </div>

      {/* Sponsors Grid */}
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center px-4 md:px-0">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              className="group relative bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:border-[var(--text-color2)]/50 transition-all duration-300 p-8 w-full h-40 flex items-center justify-center hover:bg-white/20"
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={sponsor.image}
                  alt={sponsor.alt}
                  fill
                  className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:scale-110 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-[var(--text-color2)]/10 to-transparent"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
