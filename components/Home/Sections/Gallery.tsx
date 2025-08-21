import LatestPhotos from "../LatestPhotos";
import ParticlesBackground from "../ParticlesBg";
import SectionTItle from "../SectionTItle";

const Gallery = () => {
  // Fetch latest photos from the server or database if needed

  return (
    <section
      id="gallery"
      className="relative py-16 bg-[#0c0f22] text-white text-center  flex flex-col items-center justify-center"
    >
      <ParticlesBackground
        speed={0.5}
        numberOfParticles={40}
        bgColor="#0a0a23"
      />
      <SectionTItle
        title="Últimas Fotos"
        subtitle="Tu mejor cara en la pista"
      />

      <LatestPhotos />
    </section>
  );
};

export default Gallery;
