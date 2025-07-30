import { modifiedEvents } from "@/lib/events";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import "./LatestPhotos.css"; // Assuming you have a CSS file for styles

const LatestPhotos = () => {
  return (
    <div className="container flex  my-10 z-10 gap-10 justify-center place-content-center">
      {modifiedEvents.map((event, i) => (
        <div key={i} className="relative aspect-square w-full max-w-[300px]">
          {new Array(3).fill(null).map((_, j) => (
            <div
              className={cn(
                " group overflow-hidden shadow-lg hover:cursor-pointer  absolute",
                `rotate-${j * 12}`
              )}
            >
              <Link href={`/gallery/${event.slug}`}>
                <Image
                  height={300}
                  width={300}
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
