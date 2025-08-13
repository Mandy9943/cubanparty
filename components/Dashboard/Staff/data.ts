import { Facebook, Instagram, Youtube } from "lucide-react";
import { StaffMember } from "./types";

export const team: StaffMember[] = [
  {
    id: "1",
    name: "Roger Zazo",
    role: "Director",
    image: "/assets/staff/roger.png",
    socials: [
      { icon: Instagram, url: "https://www.instagram.com/roger_zazo/" },
      { icon: Facebook, url: "https://www.facebook.com/yasmany.zazotoirac" },
    ],
    status: "active",
  },
  {
    id: "2",
    name: "Yoandry Rodríguez",
    role: "Director",
    image: "/assets/staff/yoandris.jpg",
    socials: [
      {
        icon: Instagram,
        url: "https://www.instagram.com/yoandryrodriguezrios?igsh=ZGoycGl1N2JibWlk",
      },
    ],
    status: "active",
  },
  {
    id: "3",
    name: "Enrique Orozco",
    role: "Showman",
    image: "/assets/staff/enrique.jpg",
    socials: [
      { icon: Instagram, url: "https://www.instagram.com/enriqueparty2025/" },
    ],
    status: "active",
  },
  {
    id: "4",
    name: "Huberto Alejandro",
    role: "DJ",
    image: "/assets/staff/1berto.webp",
    socials: [
      { icon: Instagram, url: "https://www.instagram.com/1berto_dj_cuba/_" },
    ],
    status: "active",
  },
  {
    id: "5",
    name: "Rome Candebat",
    role: "VJ",
    image: "/assets/staff/vjrome.jpeg",
    socials: [
      {
        icon: Youtube,
        url: "https://www.youtube.com/channel/UCn7tXkBSHB1tVt7ycLwwb5A",
      },
      {
        icon: Instagram,
        url: "https://www.instagram.com/vjrome",
      },
    ],
    status: "active",
  },
  {
    id: "6",
    name: "Eli Álvarez",
    role: "RRPP",
    image: "/assets/staff/eli.jpg",
    socials: [
      { icon: Instagram, url: "https://www.instagram.com/_00alvarezely_" },
      { icon: Facebook, url: "https://www.facebook.com/eli.alvarez.300730/" },
    ],
    status: "active",
  },
  {
    id: "7",
    name: "Osleidy Rojas",
    role: "RRPP",
    image: "/assets/staff/osleidy.jpg",
    socials: [
      { icon: Instagram, url: "https://www.instagram.com/osle.cubanita" },
    ],
    status: "active",
  },
];
