import Image from "next/image";
import Link from "next/link";
import MenuBar from "../ui/NavBar";

const Header = () => {
  return (
    <nav className="fixed top-0 w-full h-18 md:h-24 px-6 md:px-25 lg:px-25 z-80 bg-black/30 shadow-md">
      <div className="flex h-full items-center justify-between">
        {/* Logo + Título */}
        <Link href="/" className="flex items-center gap-3 hover:cursor-pointer">
          <Image
            alt="logo"
            src="/assets/cuban-party.uy-logo.jpg"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="leading-relaxed flex flex-col">
            <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-[var(--text-color1)]">
              Cuban Party
            </h2>
          </div>
        </Link>
        <MenuBar></MenuBar>
      </div>
    </nav>
  );
};

export default Header;
