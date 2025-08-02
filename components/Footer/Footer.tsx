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
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-white font-sans text-xs md:text-sm font-[300] text-center md:text-left">
              Cuban Party &copy; Todos los derechos reservados -{" "}
              {new Date().getFullYear()}
            </p>
            <a
              href="https://www.instagram.com/cuban.party.uy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-color2 hover:text-color1 transition-colors duration-300 text-base"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @cuban.party.uy
            </a>
          </div>
          <span className="">
            <GoTopButton />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
