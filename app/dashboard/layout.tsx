"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, sidebar should be open by default
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main
        className={`
          flex-1 overflow-auto transition-all duration-300 ease-in-out
          ${!isMobile && sidebarOpen ? "" : isMobile ? "ml-0" : "md:ml-16"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
