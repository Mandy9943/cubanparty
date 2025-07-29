export interface Event {
  img: string;
  alt: string;
  eventName: string;
}


export const events: Event[] = [
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

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const modifiedEvents = events.map((e)=>(
  {...e, slug: slugify(e.eventName)}
));