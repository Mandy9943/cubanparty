export interface Event {
  img: string;
  alt: string;
  eventName: string;
}
export interface ModifiedEvent extends Event {
  slug: string;
  imgPerEvent: string[];
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

export const modifiedEvents:ModifiedEvent[] = events.map((e,i)=>(
  {...e, slug: slugify(e.eventName), imgPerEvent: 
    [
        `/assets/gallery/event-${i+1}/1.jpeg`,
        `/assets/gallery/event-${i+1}/2.jpeg`,
        `/assets/gallery/event-${i+1}/3.jpeg`,
    ]
}
));