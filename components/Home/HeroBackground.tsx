import Image from "next/image";
const images = ["/assets/bg1.jpg", "/assets/bg2.jpg", "/assets/bg3.jpg"];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`Background ${i + 1}`}
          fill
          className={`absolute object-cover hero-bg-${i + 1}`}
          style={{ zIndex: 1 }}
        />
      ))}
      <div className="absolute inset-0 bg-neutral-950/70 z-10" />
    </div>
  );
};

export default HeroBackground;
