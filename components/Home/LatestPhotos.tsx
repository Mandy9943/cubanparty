import Image from "next/image";

const images = [
  "/assets/bg-1.jpeg",
  "/assets/bg-2.webp",
  "/assets/bg-3.jpeg",
  "/assets/img3.jpeg",
];

const LatestPhotos = () => {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-10 z-10">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative group overflow-hidden rounded-md shadow-lg hover:cursor-pointer aspect-square"
        >
          <Image
            height={150}
            width={150}
            src={src}
            alt={`photo ${i}`}
            className="w-full h-full object-cover group-hover:scale-105 hover:opacity-70 transition-transform duration-400"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-sm text-white rounded">
            Event Name
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPhotos;
