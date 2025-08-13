import { DashboardEvent } from "./types";

export const events: DashboardEvent[] = [
  {
    id: "1",
    title: "Nostalgia a lo Cubano",
    description:
      "Quieres vivir la experiencia de una Noche de la Nostalgia diferente, ven con nosotros que no te vas a arrepentir, te esperamos este 15 de Agosto.",
    date: "2025-08-15",
    time: "23:50",
    venue: "L Club",
    address: "Uruguay 1136, Montevideo, Centro",
    image: "/assets/events/nostalgia.jpg",
    price: "Desde $350",
    pricing: {
      general: "$350",
      mesa4vip: "$2500 (4 personas)",
      mesa3vip: "$3000 (5 personas)",
    },
    buyTicketLink:
      "https://www.passline.com/eventos/nostalgia-a-lo-cubano?fbclid=PAZXh0bgNhZW0CMTEAAafqmJZ_0tZx7zO5wPW2wE6M6nivvUTLYv7wmm8LRgUZvhfwwyy4JHyiDCPKIQ_aem_7bboxqvfcP5flxiRfX7v1g",
    status: "upcoming",
    category: "Música Latina",
    capacity: 500,
    attendees: 245,
    slug: "nostalgia-a-lo-cubano",
  },
  {
    id: "2",
    title: "Adolescentes en Concierto por primera vez en Uruguay",
    description:
      "Los ex adolescentes, voces originales se reúnen para hacer sus grandes éxitos mundiales por primera vez en la historia en Uruguay. Tendremos una noche increíble de música en vivo y fiesta latina que quedará marcada en la historia.",
    date: "2025-09-13",
    time: "23:00",
    venue: "L Club Montevideo",
    address: "Av. Uruguay 1136, 11100 Montevideo, Depto",
    image: "/assets/events/adolescentes.jpg",
    price: "Desde $1060",
    pricing: {
      preventa: "$1060 (Agotado)",
      lote1: "$1360 (Agotado)",
      lote2: "$1560",
      vip5personas: "$11300 ($2260 cada una)",
      vippalco12personas: "$24720 ($2060 cada una)",
    },
    buyTicketLink:
      "https://redtickets.uy/evento/Adolescentes-en-Concierto-por-primera-vez-en-Uruguay/22726/",
    status: "upcoming",
    category: "Concierto",
    capacity: 800,
    attendees: 650,
    slug: "adolescentes-en-concierto-por-primera-vez-en-uruguay",
  },
  {
    id: "3",
    title: "Fiesta Neon",
    description:
      "Una noche llena de colores neón, música electrónica y diversión sin límites. Ven con tu mejor outfit fluorescente y vive una experiencia única.",
    date: "2024-12-20",
    time: "22:00",
    venue: "Club Neon",
    address: "Bulevar Artigas 1234, Montevideo",
    image: "/assets/gallery/neon/neon-1.jpg",
    price: "Desde $280",
    pricing: {
      general: "$280",
      vip5personas: "$1800 (5 personas)",
    },
    buyTicketLink: "#",
    status: "completed",
    category: "Fiesta Temática",
    capacity: 400,
    attendees: 380,
    slug: "fiesta-neon",
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
