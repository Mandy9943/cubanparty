import AnimatedButton from "@/components/ui/Button";
import LatestPhotos from "../LatestPhotos";
import ParticlesBackground from "../ParticlesBg";
import SectionTItle from "../SectionTItle";

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="relative py-16 bg-[#0c0f22] text-white text-center  flex flex-col items-center justify-center"
    >
      <ParticlesBackground />
      <SectionTItle title="Últimas Fotos" subtitle="Tu mejor cara en la pista" />

      <LatestPhotos />
      <AnimatedButton className="!z-10 mt-16" text="All Gallery" />
    </section>
  );
};

export default Gallery;
