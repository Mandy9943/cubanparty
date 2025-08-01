"use client";

import { useActiveSection } from "@/lib/hooks";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const components = [
  {
    title: "Inicio",
    href: "/#home",
    description: "",
  },
  {
    title: "Nosotros",
    href: "/#about",
    description: "",
  },
  {
    title: "Promotores",
    href: "/#promoters",
    description: "",
  },
  {
    title: "Galería",
    href: "/#gallery",
    description: "",
  },
  {
    title: "Patrocinadores",
    href: "/#sponsors",
    description: "",
  },
  {
    title: 'Testimonios',
    href: '/#testimonials',
    description: '',
  }
];

const MenuBar = () => {
  const pathname = usePathname();
  //console.log(pathname);
  const activeSection =
    pathname === "/"
      ? useActiveSection(components.map((c) => c.href.split("#")[1]))
      : null;
  const [mobileOpen, setMobileOpen] = useState(false);
  //console.log(activeSection);
  const renderMenuItems = (isMobile: boolean) =>
    components.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={clsx(
          isMobile
            ? [
                "w-full shadow-md p-5",
                activeSection === item.href.split("#")[1]
                  ? "text-white bg-neutral-800"
                  : "hover:text-white hover:bg-neutral-800",
              ]
            : [
                "menu-btn relative flex flex-col items-center",
                activeSection === item.href.split("#")[1] && "active",
              ]
        )}
      >
        <span className={isMobile ? "font-bold text-2xl" : "font-bold text-xl"}>
          {item.title}
        </span>
        {!isMobile && (
          <div className="beat-bars">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="beat-bar"></div>
            ))}
          </div>
        )}
      </Link>
    ));

  return (
    <div className="flex items-center">
      <div className="hidden lg:flex gap-6 items-center transition-all duration-300">
        {renderMenuItems(false)}
      </div>

      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:cursor-pointer"
        >
          <Menu className="h-10 w-10 text-white" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed z-50 inset-0 bg-[var(--text-color1)] flex flex-col items-start transition-colors duration-1000 animate-fade-slide">
          <div className="w-full flex justify-end shadow-md p-5">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 hover:cursor-pointer justify-end text-white hover:text-neutral-800"
            >
              <X className="h-10 w-10" />
            </button>
          </div>
          {renderMenuItems(true)}
        </div>
      )}
    </div>
  );
};

export default MenuBar;
