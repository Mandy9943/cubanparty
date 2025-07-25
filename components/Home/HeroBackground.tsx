
import Image from "next/image";
const images = [
  '/assets/bg-1.jpeg',
  '/assets/bg-2.webp',
  '/assets/bg-3.jpeg',
];

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
      {images.map((src, i)=>(
        <Image
            key={i}
            src={src}
            alt={`Background ${i + 1}`}
            fill
            className={`absolute object-cover hero-bg-${i + 1}`}
            style={{ zIndex: 1 }}
        />
      ))}
        <div className="absolute inset-0 bg-black/80 z-10" />
    </div>
  );
};

export default HeroBackground;