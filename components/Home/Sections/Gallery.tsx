import AnimatedButton from "@/components/ui/Button";
import LatestPhotos from "../LatestPhotos";
import ParticlesBackground from "../ParticlesBg";
import SectionTItle from "../SectionTItle";

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="relative py-16 bg-[#0c0f22] text-white text-center min-h-screen flex flex-col items-center justify-center px-8"
    >
      <ParticlesBackground />
      <SectionTItle title="Latest Photos" subtitle="Cuban Party Gallery"/>
      <LatestPhotos />
      <AnimatedButton
        className="bg-[var(--text-color2)] text-black"
        text="All Gallery"
      />
    </section>
  );
};

export default Gallery;
