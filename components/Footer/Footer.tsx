import Image from "next/image";
import GoTopButton from "./GoTopButton";

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden pt-[80px] px-0 pb-[100px] sm:pb-[85px] footer-dark bg-[#03051a]">
      {/* background image */}
      <div className="absolute inset-0  animate-footer-scroll hidden sm:flex">
        <Image
          alt="Footer Image"
          src="/assets/footer-bg-long-2.jpg"
          width={4645}
          height={355}
          className="object-cover w-full h-full"
        />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto container opacity-75 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-4">
            <Image
              alt="Footer Logo"
              src="/assets/cuban-party.uy-logo.jpg"
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px] md:w-[80px] md:h-[80px] md:mr-4"
            />
            <h2 className="text-color1 font-extrabold uppercase text-4xl md:text-5xl flex flex-col items-center md:items-start">
              <span>Cuban</span>
              <span className="text-color2 -mt-2 text-xl md:text-2xl">
                Party
              </span>
            </h2>
          </div>
          <p className="text-sm text-color2 text-center md:text-left md:ml-6 max-w-[300px] md:max-w-[350px] font-sans leading-[22.4px] px-4 md:px-0">
            ¡Vive la experiencia Cuban Party! Música, cultura y diversión en
            cada evento. Únete a nuestra comunidad y celebra la vida con
            nosotros. ¡Te esperamos para compartir momentos inolvidables!
          </p>
        </div>
      </div>
      <div className="absolute -bottom-3 z-10 w-full pt-[30px] pb-[24px] opacity-75">
        <div className="container  flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-2 sm:gap-6 md:gap-0 px-4 md:px-0">
          <p className="text-white font-sans text-xs md:text-sm font-[300] text-center md:text-left">
            Cuban Party &copy; Todos los derechos reservados -{" "}
            {new Date().getFullYear()}
          </p>
          <span className="">
            <GoTopButton />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
