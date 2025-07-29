import Image from "next/image";
import './LatestPhotos.css'; // Assuming you have a CSS file for styles
import Link from "next/link";
import { modifiedEvents } from "@/lib/events";





const LatestPhotos = () => {
  return (
    <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6 my-10 z-10 justify-items-center">
      {modifiedEvents.map((event, i) => (
        <div
          key={i}
          className="relative group overflow-hidden shadow-lg hover:cursor-pointer aspect-square"
        >
          <Link href={`/gallery/${event.slug}`}>
            <Image
            height={300}
            width={300}
            src={event.img}
            alt={`photo ${i}`}
            className="w-full h-full object-cover"
          />
          <div className="overlay"></div>
          <div className="title">{event.eventName}</div>
          </Link>
          
        </div>
      ))}
    </div>
  );
};

export default LatestPhotos;
