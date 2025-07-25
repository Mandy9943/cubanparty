import Image from "next/image";
import GoTopButton from "./GoTopButton";

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden pt-[80px] px-0 pb-[85px] footer-dark">
      {/* background image */}
      <div className="absolute inset-0 flex animate-footer-scroll">
        <Image
          alt="Footer Image"
          src="/assets/footer-bg-long-2.jpg"
          width={4645}
          height={355}
          className="object-cover w-full h-full"
        />
        <Image
          alt="Footer Image"
          src="/assets/footer-bg-long-2.jpg"
          width={4645}
          height={355}
          className="object-cover w-full h-full"
        />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto container opacity-75">
        <div className="flex items-start">
          <Image
            alt="Footer Logo"
            src="/assets/cuban-party.uy-logo.jpg"
            width={100}
            height={100}
            className="rounded-full w-[80px] h-[80px] mr-4"
          />
          <h2 className="text-color1 font-extrabold uppercase text-5xl flex flex-col">
            <span>Cuban</span>
            <span className="text-color2 -mt-2 text-2xl">Party</span>
          </h2>
          <p className="text-sm text-color2 ml-6 max-w-[350px] font-sans leading-[22.4px]">
            ¡Vive la experiencia Cuban Party! Música, cultura y diversión en
            cada evento. Únete a nuestra comunidad y celebra la vida con
            nosotros. ¡Te esperamos para compartir momentos inolvidables!
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 z-10 w-full pt-[30px] pb-[24px] opacity-75 ">
        <div className="container flex justify-between">
          <p className=" text-white font-sans text-sm font-[300]">
            Cuban Party &copy; Todos los derechos reservados -{" "}
            {new Date().getFullYear()}
          </p>
          <GoTopButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
