import AnimatedButton from "@/components/ui/Button";
import LatestPhotos from "../LatestPhotos";
import ParticlesBackground from "../ParticlesBg";

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="relative py-16 bg-[#0c0f22] text-white text-center min-h-screen flex flex-col items-center px-8"
    >
      <ParticlesBackground />
      <div className="mb-10 flex flex-col w-full z-10 items-center">
        <h3 className="text-[var(--text-color1)] font-bold uppercase tracking-widest">
          Cuban Party Gallery
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
          Latest Photos
        </h2>
        <div className="mt-4 w-12 mx-auto border-t-2 text-[var(--text-color1)]"></div>
      </div>
      <LatestPhotos />
      <AnimatedButton
        className="ripple-outer bg-[var(--text-color2)] text-black px-6 py-3 rounded-lg shadow-lg hover:cursor-pointer mt-10"
        text="All Gallery"
      />
    </section>
  );
};

export default Gallery;
