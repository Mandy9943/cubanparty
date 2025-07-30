import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
const team = [
  {
    name: "Roger Zazo",
    role: "Director",
    image: "/assets/promotor1.png",
    socials: [
      { icon: Facebook, url: "https://www.facebook.com/yasmany.zazotoirac" },
      { icon: Instagram, url: "https://www.instagram.com/roger_zazo/" },
    ],
  },
  {
    name: "Pedro Arman",
    role: "Promotor",
    image: "/assets/promotor2.jpg",
    socials: [
      { icon: Facebook, url: "https://www.facebook.com/pedro.arman.2025" },
      { icon: Instagram, url: "https://www.instagram.com/pedro__arman/" },
    ],
  },
  {
    name: "Enrique Orozco",
    role: "Showman",
    image: "/assets/promotor3.jpg",
    socials: [
      { icon: Instagram, url: "https://www.instagram.com/enriqueparty2025/" },
    ],
  },
  {
    name: "Eli Álvarez",
    role: "Promotora",
    image: "/assets/promotor4.jpg",
    socials: [
      { icon: Twitter, url: "#" },
      { icon: Facebook, url: "https://www.facebook.com/eli.alvarez.300730/" },
      { icon: Instagram, url: "https://www.instagram.com/_00alvarezely_" },
    ],
  },
];

const Managers = () => {
  return (
    <section id="promoters" className=" w-full bg-color1 pt-30 pb-10">
      <div className="text-center relative z-10 mt-16 mb-8">
        <span className="text-black tex-xl sm:text-2xl mb-1 font-extrabold uppercase leading-[26.4px]">
          Detras del proyecto
        </span>
        <h2 className=" text-4xl sm:text-6xl text-white font-extrabold leading-8 sm:leading-[66px] uppercase">
          Promotores
        </h2>
        <Image
          src="/assets/line_-white.png"
          alt="Section Title Divider"
          width={81}
          height={15}
          className="mx-auto"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {team.map((member, index) => (
            <div key={index} className="group relative w-[250px]">
              <div className="relative rounded-full border-4 border-[#00ffff] overflow-hidden w-[250px] h-[250px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={280}
                  height={280}
                  className="object-cover w-[]250px h-[250px] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[#00ffff] text-3xl font-bold">
                  {member.name}
                </h3>
                <p className="text-balck text-xl mt-1">{member.role}</p>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {member.socials.map((social, idx) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      className="text-white hover:text-[#00ffff] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Managers;
