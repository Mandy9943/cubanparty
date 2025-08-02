import Image from "next/image";
import Link from "next/link";
import MenuBar from "../ui/NavBar";

const Header = () => {
  return (
    <nav className="fixed top-0 w-full h-18 md:h-24 px-6 md:px-25 lg:px-25 z-80 bg-black/60 shadow-md">
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
        <div className="flex items-center gap-2 sm:gap-4">
          <MenuBar></MenuBar>
          <a
            href="https://www.instagram.com/cuban.party.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--text-color2)] hover:text-[var(--text-color1)] transition-colors duration-300 text-sm md:text-base sm:-mt-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="hidden md:inline">@cuban.party.uy</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
