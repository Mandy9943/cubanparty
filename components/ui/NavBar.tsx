"use client";

import { useActiveSection } from "@/lib/hooks";
import clsx from "clsx";
import { Menu, X , ChevronDown} from "lucide-react";
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
    title: "Eventos",
    href: "/#events",
    description: "",
  },
  {
    title: "Nosotros",
    submenu: [
      { title: "Quiénes somos", href: "/#about", description: "" },
      { title: "Promotores", href: "/#promoters", description: "" },
      { title: "Patrocinadores", href: "/#sponsors", description: ""},
    ],
  },
  {
    title: "Galería",
    href: "/#gallery",
    description: "",
  },
  {
    title: "Testimonios",
    href: "/#testimonials",
    description: "",
  },
];

const MenuBar = () => {
  const pathname = usePathname();
  const activeSection =
    pathname === "/"
      ? useActiveSection(
          components
            .flatMap((c) =>
              c.submenu
                ? c.submenu.map((s) => s.href.split("#")[1])
                : c.href.split("#")[1]
            )
            .filter(Boolean)
        )
      : null;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const renderMenuItems = (isMobile: boolean) =>
    components.map((item) => {
      const isActive =
        !item.submenu && activeSection === item.href?.split("#")[1];
      const hasSubmenu = !!item.submenu;
      const isOpen = openSubmenus.includes(item.title);

      return (
        <div
          key={item.title}
          className={clsx(
            "w-full",
            isMobile ? "" : "relative group flex flex-col items-center"
          )}
        >
          <div
            className={clsx(
              isMobile
                ? [
                    "flex justify-between items-center w-full p-5 shadow-md font-bold text-2xl",
                    isActive
                      ? "text-white"
                      : !isOpen
                      ? "hover:text-white hover:bg-neutral-800"
                      : "text-white bg-neutral-800",
                  ]
                : [
                    "menu-btn relative flex flex-col items-center font-bold text-xl",
                    isActive && "active",
                  ]
            )}
          >
            {hasSubmenu ? (
              <button
                className="w-full flex justify-between items-center hover:cursor-pointer"
                onClick={() => isMobile && toggleSubmenu(item.title)}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={clsx(
                    "ml-2 transition-transform duration-300",
                    isMobile ? isOpen && "rotate-180" : "group-hover:rotate-180"
                  )}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="w-full text-left"
              >
                {item.title}
              </Link>
            )}
            {!isMobile && isActive && (
              <div className="beat-bars">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="beat-bar"></div>
                ))}
              </div>
            )}
          </div>

          {/* Submenu Items */}
          {hasSubmenu &&
            (isMobile ? (
              isOpen && (
                <div className="flex flex-col w-full bg-[var(--text-color2)] font-bold text-2xl">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="w-full p-5 pl-8 text-black hover:bg-neutral-800 hover:text-white"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )
            ) : (
              <div className="absolute top-full -left-2 text-xl font-bold hidden group-hover:flex flex-col bg-[var(--text-color2)] shadow-md z-10">
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="px-6 py-3 whitespace-nowrap text-black hover:bg-[var(--text-color1)] hover:text-white"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            ))}
        </div>
      );
    });

  return (
    <div className="flex items-center">
      {/* Desktop */}
      <div className="hidden lg:flex gap-6 items-center transition-all duration-300">
        {renderMenuItems(false)}
      </div>

      {/* Mobile button */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:cursor-pointer"
        >
          <Menu className="h-10 w-10 text-white" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed z-50 inset-0 bg-[var(--text-color1)] flex flex-col items-start transition-colors duration-1000 animate-fade-slide">
          <div className="w-full flex justify-end shadow-md p-5">
            <button
              onClick={() => setMobileOpen(false)}
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
