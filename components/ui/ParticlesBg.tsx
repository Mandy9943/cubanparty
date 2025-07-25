"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
    // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

 
  const particlesOptions: ISourceOptions = useMemo(() => ({
    background: {
      color: { value: "#0a0a23" },
    },
    fullScreen: { enable: false },
    particles: {
      number: { value: 40 },
      color: { value: "#ffffff" },
      links: {
        enable: true,
        color: "#00f0ff",
        distance: 120,
      },
      move: { enable: true, speed: 0.5, direction: "none", outModes: { default: "out" } },
      size: { value: 2 },
    },
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={particlesOptions}
      className="absolute inset-0 z-0"
    />
  );
}
