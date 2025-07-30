export interface Event {
  img: string;
  alt: string;
  eventName: string;
  imgPerEvent: string[];
}
export interface ModifiedEvent extends Event {
  slug: string;
  imgPerEvent: string[];
}

export const events: Event[] = [
  {
    img: "/assets/gallery/neon/neon-1.jpg",
    alt: "Fiesta Neon",
    eventName: "Fiesta Neon",
    imgPerEvent: [
      "/assets/gallery/neon/neon-1.jpg",
      "/assets/gallery/neon/neon-2.jpg",
      "/assets/gallery/neon/neon-3.jpg",
      "/assets/gallery/neon/neon-4.jpg",
      "/assets/gallery/neon/neon-5.jpg",
      "/assets/gallery/neon/neon-6.jpg",
      "/assets/gallery/neon/neon-7.jpg",
      "/assets/gallery/neon/neon-8.jpg",
      "/assets/gallery/neon/neon-9.jpg",
      "/assets/gallery/neon/neon-10.jpg",
      "/assets/gallery/neon/neon-11.jpg",
      "/assets/gallery/neon/neon-12.jpg",
      "/assets/gallery/neon/neon-13.jpg",
      "/assets/gallery/neon/neon-14.jpg",
      "/assets/gallery/neon/neon-15.jpg",
      "/assets/gallery/neon/neon-16.jpg",
      "/assets/gallery/neon/neon-17.jpg",
      "/assets/gallery/neon/neon-18.jpg",
    ],
  },
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

export const modifiedEvents: ModifiedEvent[] = events.map((e, i) => ({
  ...e,
  slug: slugify(e.eventName),
}));
