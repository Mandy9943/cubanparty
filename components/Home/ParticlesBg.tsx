"use client";

import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

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

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "#0a0a23" },
      },
      fullScreen: { enable: false },
      particles: {
        number: { value: 40 },
        color: { value: "#D10459" },

        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { default: "out" },
        },
        size: { value: { min: 1, max: 4 } },
      },
    }),
    []
  );
  const particlesOptions2: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "transparent" },
      },
      fullScreen: { enable: false },
      particles: {
        number: { value: 40 },
        color: { value: "#6DFDFF" },

        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { default: "out" },
        },
        size: { value: { min: 1, max: 4 } },
      },
    }),
    []
  );

  if (!init) return null;

  return (
    <>
      <div className="absolute inset-0 z-[1] bg-black opacity-25"></div>
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />
      <Particles
        id="tsparticles2"
        options={particlesOptions2}
        className="absolute inset-0 z-0"
      />
    </>
  );
}
