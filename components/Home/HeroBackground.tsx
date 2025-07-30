import Image from "next/image";
const images = [
  "/assets/hero/1.jpg",
  "/assets/hero/2.jpg",
  "/assets/hero/3.jpg",
  "/assets/hero/4.jpg",
  "/assets/hero/5.jpg",
];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`Cuban Party background ${i + 1}`}
          fill
          priority={i === 0} // Load first image with priority
          quality={85}
          className={`absolute object-cover hero-bg-${i + 1} transform-gpu`}
          style={{
            zIndex: 1,
            imageRendering: "auto",
          }}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/70 to-neutral-950/80 z-10" />
    </div>
  );
};

export default HeroBackground;
