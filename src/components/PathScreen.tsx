import React, { useState } from "react";
import { motion } from "framer-motion";
import SkyCanvas from "./SkyCanvas";

type LanternKey = "likes" | "letter" | "wish" | "gift";

interface LanternData {
  key: LanternKey;
  emoji: string;
  label: string;
  x: string;
  delay: number;
}

const LANTERNS: LanternData[] = [
  { key: "likes", emoji: "❤️", label: "Điều Anh Thích", x: "15%", delay: 0 },
  { key: "letter", emoji: "🏮", label: "Lời Muốn Nói", x: "35%", delay: 0.15 },
  { key: "wish", emoji: "🏮", label: "Điều Ước", x: "57%", delay: 0.3 },
  { key: "gift", emoji: "🎁", label: "Món Quà", x: "76%", delay: 0.45 },
];

interface PathScreenProps {
  onSelect: (key: LanternKey) => void;
}

const PathScreen: React.FC<PathScreenProps> = ({ onSelect }) => {
  const [hovered, setHovered] = useState<LanternKey | null>(null);

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 50% 0%, #162035 0%, #0a0e1a 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <SkyCanvas />

      {/* Moon top center */}
      <motion.div
        style={{
          position: "absolute",
          top: "-40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(120px, 20vw, 180px)",
          height: "clamp(120px, 20vw, 180px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 35%, #fff9dc, #f5d56e 50%, #e8b84b)",
          boxShadow:
            "0 0 60px rgba(245,213,110,0.5), 0 0 120px rgba(245,213,110,0.25), 0 0 200px rgba(245,213,110,0.1)",
        }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moon light beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "70%",
          background:
            "linear-gradient(to bottom, rgba(245,213,110,0.08) 0%, transparent 100%)",
          clipPath: "polygon(40% 0, 60% 0, 80% 100%, 20% 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          marginTop: "18vh",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "rgba(245,213,110,0.7)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ✦ Đi theo ánh trăng ✦
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
            color: "#fdf4e3",
            fontWeight: 400,
          }}
        >
          Chạm vào đèn lồng để khám phá
        </h2>
      </motion.div>

      {/* Path */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
        }}
      >
        {/* Ground/path */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background:
              "linear-gradient(to top, rgba(15,22,41,0.95) 0%, rgba(15,22,41,0.6) 60%, transparent 100%)",
          }}
        />

        {/* Cobblestone path */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "8px",
            background:
              "linear-gradient(90deg, transparent, rgba(245,213,110,0.15) 20%, rgba(245,213,110,0.25) 50%, rgba(245,213,110,0.15) 80%, transparent)",
            borderRadius: 4,
            filter: "blur(2px)",
          }}
        />

        {/* Trees silhouette left */}
        <svg
          style={{
            position: "absolute",
            bottom: "15%",
            left: 0,
            height: "70%",
            opacity: 0.6,
          }}
          viewBox="0 0 200 300"
          fill="none"
        >
          <path
            d="M30 300 L30 100 L0 150 L20 100 L5 120 L30 60 L55 120 L40 100 L60 150 L30 100Z"
            fill="#0f1629"
          />
          <path
            d="M100 300 L100 140 L75 190 L90 140 L70 170 L100 90 L130 170 L110 140 L125 190 L100 140Z"
            fill="#0a0e1a"
          />
          <path
            d="M170 300 L170 120 L148 165 L162 120 L145 148 L170 75 L195 148 L178 120 L192 165 L170 120Z"
            fill="#0f1629"
          />
        </svg>
        {/* Trees silhouette right */}
        <svg
          style={{
            position: "absolute",
            bottom: "15%",
            right: 0,
            height: "70%",
            opacity: 0.6,
            transform: "scaleX(-1)",
          }}
          viewBox="0 0 200 300"
          fill="none"
        >
          <path
            d="M30 300 L30 100 L0 150 L20 100 L5 120 L30 60 L55 120 L40 100 L60 150 L30 100Z"
            fill="#0f1629"
          />
          <path
            d="M100 300 L100 140 L75 190 L90 140 L70 170 L100 90 L130 170 L110 140 L125 190 L100 140Z"
            fill="#0a0e1a"
          />
          <path
            d="M170 300 L170 120 L148 165 L162 120 L145 148 L170 75 L195 148 L178 120 L192 165 L170 120Z"
            fill="#0f1629"
          />
        </svg>

        {/* Lanterns row */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "clamp(16px, 4vw, 48px)",
            padding: "0 5%",
          }}
        >
          {LANTERNS.map((ln) => (
            <motion.button
              key={ln.key}
              onClick={() => onSelect(ln.key)}
              onHoverStart={() => setHovered(ln.key)}
              onHoverEnd={() => setHovered(null)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + ln.delay,
                duration: 0.7,
                ease: "easeOut",
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fdf4e3",
                minWidth: 70,
                flex: "1 1 0",
                maxWidth: 120,
              }}
            >
              {/* String */}
              <div
                style={{
                  width: 1,
                  height: 16,
                  background: "rgba(245,213,110,0.3)",
                }}
              />

              {/* Lantern body */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  boxShadow:
                    hovered === ln.key
                      ? [
                          "0 0 30px #d4613a88, 0 0 60px #d4613a44",
                          "0 0 50px #d4613aaa, 0 0 80px #d4613a55",
                        ]
                      : ["0 0 20px #d4613a66", "0 0 35px #d4613a44"],
                }}
                transition={{
                  y: {
                    duration: 2.5 + ln.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                style={{
                  width: "clamp(44px, 8vw, 64px)",
                  height: "clamp(60px, 10vw, 86px)",
                  borderRadius: "35% 35% 45% 45%",
                  background:
                    ln.key === "gift"
                      ? "radial-gradient(ellipse at 50% 30%, #c0394f, #8b1a2e)"
                      : "radial-gradient(ellipse at 50% 30%, #e8733a, #b84a20)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  transition: "transform 0.2s ease",
                  transform: hovered === ln.key ? "scale(1.12)" : "scale(1)",
                  border:
                    hovered === ln.key
                      ? "1px solid rgba(245,213,110,0.4)"
                      : "1px solid transparent",
                }}
              >
                <span style={{ fontSize: "clamp(16px, 3vw, 22px)" }}>
                  {ln.emoji}
                </span>
                {/* Inner glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 6,
                    borderRadius: "30%",
                    background:
                      "radial-gradient(circle, rgba(255,220,130,0.4), transparent)",
                    animation: "pulse-glow 2s infinite",
                  }}
                />
              </motion.div>

              {/* Tassel */}
              <div
                style={{
                  width: 2,
                  height: 10,
                  background: "#d4613a",
                  opacity: 0.8,
                }}
              />
              <div style={{ display: "flex", gap: 3 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 1,
                      height: 8,
                      background: "#d4613a",
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>

              {/* Label */}
              <motion.span
                animate={{ opacity: hovered === ln.key ? 1 : 0.7 }}
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  color: hovered === ln.key ? "#f5d56e" : "#fdf4e3",
                  textShadow:
                    hovered === ln.key
                      ? "0 0 10px rgba(245,213,110,0.6)"
                      : "none",
                  transition: "all 0.3s",
                }}
              >
                {ln.label}
              </motion.span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PathScreen;
export type { LanternKey };
