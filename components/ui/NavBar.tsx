"use client";

import Link from "next/link";
import { useActiveSection } from "@/lib/hooks";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const components = [
  {
    title: "Home",
    href: "#home",
    description: "",
    submenu: [{ label: "HomePage", href: "#home" }],
  },
  {
    title: "gallery",
    href: "#gallery",
    description: "",
    submenu: [{ label: "Gallery", href: "#gallery" }],
  },
  {
    title: "About",
    href: "#about",
    description: "",
    submenu: [
      { label: "About Us", href: "#about" },
      { label: "Our Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const MenuBar = () => {
  const activeSection = useActiveSection(
    components.map((comp) => comp.href.replace("#", ""))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div
        className={`hidden md:flex gap-6 items-center transition-all duration-300`}
      >
        {components.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "menu-btn relative flex flex-col items-center",
              activeSection === item.href.replace("#", "") ? "active" : ""
            )}
          >
            <span className="font-bold text-xl">{item.title}</span>

            <div className="beat-bars">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="beat-bar"></div>
              ))}
            </div>
          </Link>
        ))}
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:cursor-pointer"
        >
          <Menu className="h-10 w-10 text-white" />
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute top-0 left-0 h-full w-full bg-[var(--text-color1)] flex flex-col items-start">
          <div className="w-full flex justify-end shadow-md p-5"> 
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:cursor-pointer justify-end"
            >
              <X className="h-10 w-10 text-white" />
            </button>
          </div>   
          {components.map((item) => (
              <Link
              key={item.href}  
              href={item.href}
                className="w-full shadow-md hover:text-white hover:bg-neutral-800 p-5 transition-colors" 
              >
                <span className="font-bold text-2xl">{item.title}</span>
              </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default MenuBar;

