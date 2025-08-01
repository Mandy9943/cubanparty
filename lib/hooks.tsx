"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");
    console.log(activeSection);
    console.log(sectionIds);
  useEffect(() => {
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry)=>{
          const id = entry.target.getAttribute('id');
          console.log("Entry:", id, entry.isIntersecting, entry.intersectionRatio);
        })
        //console.log(entries);
        //console.log(observer);
        const visible = entries.find((entry) => entry.isIntersecting);
        //console.log(visible);
        if (visible) {
          const id = visible.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.53, // 60% del bloque debe estar visible para activarse
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        console.log(el);
        if (el) observer.unobserve(el);
      });
    };
  }, [sectionIds]);
  //console.log("Active Section:", activeSection);
  return activeSection;
}
