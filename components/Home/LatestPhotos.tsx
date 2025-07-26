import Image from "next/image";
import './LatestPhotos.css'; // Assuming you have a CSS file for styles

interface Event {
  img: string;
  alt: string;
  eventName: string;
}

const events: Event[] = [
  {
    img: "/assets/bg-1.jpeg",
    alt: "Noche de Fuego",
    eventName: "Noche de Fuego",
  },
  {
    img: "/assets/bg-2.webp",
    alt: "Ritmo Caribeño",
    eventName: "Ritmo Caribeño",
  },
  {
    img: "/assets/bg-3.jpeg",
    alt: "La Habana Late",
    eventName: "La Habana Late",
  },
  {
    img: "/assets/img.jpg",
    alt: "Fiebre Tropical",
    eventName: "Fiebre Tropical",
  }
];


const LatestPhotos = () => {
  return (
    <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6 my-10 z-10 justify-items-center">
      {events.map((event, i) => (
        <div
          key={i}
          className="relative group overflow-hidden shadow-lg hover:cursor-pointer aspect-square"
        >
          <Image
            height={300}
            width={300}
            src={event.img}
            alt={`photo ${i}`}
            className="w-full h-full object-cover"
          />
          <div className="overlay"></div>
          <div className="title">{event.eventName}</div>
        </div>
      ))}
    </div>
  );
};

export default LatestPhotos;
