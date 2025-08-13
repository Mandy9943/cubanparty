"use client";

import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Menu,
  MessageCircle,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation: NavItem[] = [
  {
    name: "Staff",
    icon: Users,
    href: "/dashboard/staff",
  },
  {
    name: "Eventos",
    icon: Calendar,
    href: "/dashboard/eventos",
  },
  {
    name: "Comentarios",
    icon: MessageCircle,
    href: "/dashboard/comentarios",
  },
  {
    name: "Galería",
    icon: ImageIcon,
    href: "/dashboard/galeria",
  },
  {
    name: "Patrocinadores",
    icon: Award,
    href: "/dashboard/patrocinadores",
  },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const NavLink = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;

    return (
      <a
        href={item.href}
        className={`
          flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group relative
          ${!isMobile && !isOpen ? "justify-center" : ""}
        `}
        onClick={() => isMobile && onToggle()}
        title={!isMobile && !isOpen ? item.name : undefined}
      >
        <Icon
          className={`h-5 w-5 text-gray-400 group-hover:text-white flex-shrink-0 ${
            !isMobile && !isOpen ? "" : "mr-3"
          }`}
        />
        {(isMobile || isOpen) && <span className="truncate">{item.name}</span>}
      </a>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white hover:bg-gray-700"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative inset-y-0 left-0 z-40 bg-gray-900 transform transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          ${isMobile ? "" : isOpen ? "md:w-64" : "md:w-16 md:translate-x-0"}
        `}
      >
        {/* Logo/Company Section */}
        <div
          className={`flex items-center h-16 px-4 bg-gray-900 border-b border-gray-700 ${
            !isMobile && !isOpen ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/assets/cuban-party.uy-logo.jpg"
                alt="Logo cuban party"
                width={32}
                height={32}
              />
            </div>
            {(isMobile || isOpen) && (
              <span className="ml-3 text-white font-semibold truncate">
                Cuban Party
              </span>
            )}
          </div>

          {/* Desktop Collapse Button */}
          {(isMobile || isOpen) && (
            <button
              onClick={onToggle}
              className="hidden md:block p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex-shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Expand Button for Collapsed State */}
        {!isMobile && !isOpen && (
          <div className="px-2 py-2">
            <button
              onClick={onToggle}
              className="w-full p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex justify-center"
              title="Expandir sidebar"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="px-2 py-4 border-t border-gray-700">
          {/* User Profile */}
          <div
            className={`mt-4 px-3 py-2 ${
              !isMobile && !isOpen ? "flex justify-center" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">S</span>
              </div>
              {(isMobile || isOpen) && (
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    shadon
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    shadon@acme.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
