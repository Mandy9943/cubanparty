"use client";

import Link from "next/link";
import { useActiveSection } from "@/lib/hooks";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { it } from "node:test";

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
      <div className={`${mobileOpen ? "flex" : "hidden"} flex-col md:flex md:flex-row items-center space-x-4 transition-all duration-300`}>
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
          {mobileOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>  
    </div>
  );
};
export default MenuBar;

/*<NavigationMenuTrigger
                  className={`menu-btn text-xl ${
                    activeSection === comp.href.replace("#", "") ? "active" : ""
                  }`}
                >
                  {comp.title}
                  <div className="beat-bars absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="beat-bar"></div>
                    ))}
                  </div>*/
