"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 2,
            random: true,
          },
          move: {
            direction: "none",
            speed: 0.5,
            outModes: {
              default: "out",
            },
          },
        },
        background: {
          color: "transparent",
        },
      }}
    />
  );
}
