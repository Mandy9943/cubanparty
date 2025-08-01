import { modifiedEvents } from "@/lib/events";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import "./LatestPhotos.css"; // Assuming you have a CSS file for styles

 const rotations = ["-rotate-6", "rotate-1", "rotate-7"]; // Puedes variar más si quieres
  const offsets = ["top-2 left-2", "top-4 left-4", "top-6 left-6"]; // O usa Tailwind arbitrario
  const zIndexes = ["z-10", "z-20", "z-30"]; // para que no se tapen mal
const LatestPhotos = () => {
  return (
    <div className="container flex my-10 z-10 gap-10 justify-center place-content-center">
      {modifiedEvents.map((event, i) => (
        <div key={i} className="relative aspect-square w-full max-w-[400px]">
          {new Array(3).fill(null).map((_, j) => (
            <div
              key={j}
              className={cn(
                
                "group overflow-hidden shadow-lg hover:cursor-pointer transition-transform duration-300 absolute",
                rotations[j],
                offsets[j],
                zIndexes[j],
              )}
            >
              <Link href={`/gallery/${event.slug}`}>
                <Image
                  height={400}
                  width={400}
                  src={event.imgPerEvent[j] || event.imgPerEvent[0]} // Fallback to first image if not enough images
                  alt={`photo ${i}-${j}`}
                  className="w-full h-full object-cover"
                  quality={100}
                />
                <div className="overlay"></div>
                <div className="title">{event.eventName}</div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LatestPhotos;
