import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "star" | "firefly" | "petal";
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface Cloud {
  id: number;
  y: number;
  scale: number;
  delay: number;
  duration: number;
  opacity: number;
}

const SkyCanvas: React.FC<{ interactive?: boolean }> = ({
  interactive = true,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    // Generate stars & fireflies
    const ps: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      ps.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 70,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        type: i < 100 ? "star" : "firefly",
      });
    }
    // Petals
    for (let i = 120; i < 135; i++) {
      ps.push({
        id: i,
        x: Math.random() * 100,
        y: -5,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 8,
        type: "petal",
      });
    }
    setParticles(ps);

    // Shooting stars
    const ss: ShootingStar[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 60 + 10,
      y: Math.random() * 30 + 5,
      delay: i * 4 + Math.random() * 4,
    }));
    setShootingStars(ss);

    // Clouds
    const cs: Cloud[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      y: Math.random() * 40 + 10,
      scale: Math.random() * 0.8 + 0.4,
      delay: -(Math.random() * 40),
      duration: Math.random() * 30 + 40,
      opacity: Math.random() * 0.12 + 0.04,
    }));
    setClouds(cs);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: interactive ? "none" : "none",
      }}
    >
      {/* Stars */}
      {particles
        .filter((p) => p.type === "star")
        .map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`,
              animation: `twinkle ${p.duration}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        ))}

      {/* Fireflies */}
      {particles
        .filter((p) => p.type === "firefly")
        .map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y + 30}%`,
              width: p.size * 2,
              height: p.size * 2,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #d4f5a0 0%, #a8e060 50%, transparent 70%)",
              boxShadow: "0 0 8px rgba(180, 240, 100, 0.8)",
              animation: `firefly ${p.duration + 3}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        ))}

      {/* Petals */}
      {particles
        .filter((p) => p.type === "petal")
        .map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: "-20px",
              width: p.size,
              height: p.size * 0.6,
              borderRadius: "50% 50% 50% 0",
              background: "rgba(245, 213, 110, 0.25)",
              border: "1px solid rgba(245, 213, 110, 0.3)",
              animation: `petalFall ${p.duration}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 2,
              background: "linear-gradient(90deg, white, transparent)",
              animation: `shoot 2s ${s.delay}s infinite`,
              animationTimingFunction: "ease-out",
              borderRadius: 2,
            }}
          />
        </div>
      ))}

      {/* Clouds */}
      {clouds.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            top: `${c.y}%`,
            left: "-300px",
            width: 300,
            height: 80,
            background: `rgba(255, 255, 255, ${c.opacity})`,
            borderRadius: "50px",
            filter: "blur(20px)",
            transform: `scale(${c.scale})`,
            animation: `drift ${c.duration}s ${c.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
};

export default SkyCanvas;
