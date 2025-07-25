import Image from "next/image";
import MenuBar from "./NavBar";


const Header = () => {
  return (
    <nav className="w-full h-24 px-6 md:px-20 lg:px-50 z-30 bg-black/30 shadow-md">
      <div className="flex h-full items-center justify-between">
        {/* Logo + Título */}
        <section className="flex items-center gap-4 hover:cursor-pointer">
          <Image
            alt="logo"
            src="/assets/cuban-party.uy-logo.jpg"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="leading-relaxed flex flex-col">
            <h2 className="font-extrabold text-xl md:text-2xl lg:text-4xl text-[var(--text-color1)]">
              Cuban Party
            </h2>
            <span className="font-bold text-sm sm:text-base md:text-lg text-[var(--text-color2)]">
              Noches Uruguayas
            </span>
          </div>
        </section>
        <MenuBar></MenuBar>
      </div>
    </nav>
  );
};

export default Header;

