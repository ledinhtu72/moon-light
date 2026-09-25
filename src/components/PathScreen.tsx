import React, { useState } from "react";
import { motion } from "framer-motion";
import SkyCanvas from "./SkyCanvas";

type LanternKey = "likes" | "letter" | "wish" | "gift";

interface LanternData {
  key: LanternKey;
  emoji: string;
  label: string;
  delay: number;
}

const LANTERNS: LanternData[] = [
  { key: "likes",  emoji: "❤️", label: "Điều Anh Thích", delay: 0    },
  { key: "letter", emoji: "🏮", label: "Lời Muốn Nói",   delay: 0.15 },
  { key: "wish",   emoji: "🏮", label: "Điều Ước",        delay: 0.3  },
  { key: "gift",   emoji: "🎁", label: "Món Quà",         delay: 0.45 },
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
        background: "radial-gradient(ellipse at 50% 0%, #162035 0%, #0a0e1a 70%)",
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

      {/* ── Moon – responsive size, never overlaps title ── */}
      <motion.div
        style={{
          position: "absolute",
          top: "-40px",
          left: "50%",
          transform: "translateX(-50%)",
          /* Desktop: 120–180px.  Mobile ≤768: reduced via clamp */
          width:  "clamp(80px, 16vw, 180px)",
          height: "clamp(80px, 16vw, 180px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #fff9dc, #f5d56e 50%, #e8b84b)",
          boxShadow:
            "0 0 60px rgba(245,213,110,0.5), 0 0 120px rgba(245,213,110,0.25), 0 0 200px rgba(245,213,110,0.1)",
          zIndex: 2,
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
          width: "min(400px, 90vw)",
          height: "70%",
          background: "linear-gradient(to bottom, rgba(245,213,110,0.08) 0%, transparent 100%)",
          clipPath: "polygon(40% 0, 60% 0, 80% 100%, 20% 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ══════════════════════════════════════════
          TITLE BLOCK
          – uses flex + padding so it never clips
          – marginTop pushes it below the moon
      ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 5,
          width: "100%",
          /* Pushes below moon on every screen width.
             clamp: min 80px (tiny mobile), preferred 18vw, max 18vh */
          marginTop: "clamp(60px, 18vw, 18vh)",
          padding: "0 24px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.7rem, 3.2vw, 1rem)",
            color: "rgba(245,213,110,0.7)",
            letterSpacing: "clamp(1px, 1vw, 3px)",
            textTransform: "uppercase",
            marginBottom: 8,
            lineHeight: 1.4,
          }}
        >
          ✦ Đi theo ánh trăng ✦
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1rem, 5vw, 2rem)",
            color: "#fdf4e3",
            fontWeight: 400,
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          Chạm vào đèn lồng để khám phá
        </h2>
      </motion.div>

      {/* ══════════════════════════════════════════
          BOTTOM SCENERY + LANTERNS
          – absolute, pinned to bottom
          – height slightly bigger on mobile so labels show
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          /* Enough height to contain lanterns + labels + padding */
          height: "clamp(200px, 48%, 55%)",
        }}
      >
        {/* Ground gradient */}
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

        {/* Trees left */}
        <svg
          style={{ position: "absolute", bottom: "15%", left: 0, height: "70%", opacity: 0.6 }}
          viewBox="0 0 200 300"
          fill="none"
        >
          <path d="M30 300 L30 100 L0 150 L20 100 L5 120 L30 60 L55 120 L40 100 L60 150 L30 100Z" fill="#0f1629" />
          <path d="M100 300 L100 140 L75 190 L90 140 L70 170 L100 90 L130 170 L110 140 L125 190 L100 140Z" fill="#0a0e1a" />
          <path d="M170 300 L170 120 L148 165 L162 120 L145 148 L170 75 L195 148 L178 120 L192 165 L170 120Z" fill="#0f1629" />
        </svg>

        {/* Trees right */}
        <svg
          style={{ position: "absolute", bottom: "15%", right: 0, height: "70%", opacity: 0.6, transform: "scaleX(-1)" }}
          viewBox="0 0 200 300"
          fill="none"
        >
          <path d="M30 300 L30 100 L0 150 L20 100 L5 120 L30 60 L55 120 L40 100 L60 150 L30 100Z" fill="#0f1629" />
          <path d="M100 300 L100 140 L75 190 L90 140 L70 170 L100 90 L130 170 L110 140 L125 190 L100 140Z" fill="#0a0e1a" />
          <path d="M170 300 L170 120 L148 165 L162 120 L145 148 L170 75 L195 148 L178 120 L192 165 L170 120Z" fill="#0f1629" />
        </svg>

        {/* ══ LANTERNS ROW ══
            CSS Grid 4 equal columns — always one row, fully centred.
            gap shrinks on narrow screens via clamp.
            padding keeps items off the edges.
        */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(28px, 6%, 10%)",
            left: 0,
            right: 0,
            /* Grid: 4 equal cols, gap scales with screen */
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(4px, 2vw, 24px)",
            padding: "0 clamp(10px, 3vw, 24px)",
            zIndex: 5,
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
              transition={{ delay: 0.6 + ln.delay, duration: 0.7, ease: "easeOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                /* No fixed minWidth — let grid control width */
                gap: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fdf4e3",
                padding: 0,
                /* Prevent button from breaking out of its grid cell */
                minWidth: 0,
                width: "100%",
              }}
            >
              {/* String */}
              <div style={{ width: 1, height: 14, background: "rgba(245,213,110,0.3)" }} />

              {/* Lantern body */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  boxShadow:
                    hovered === ln.key
                      ? ["0 0 30px #d4613a88, 0 0 60px #d4613a44", "0 0 50px #d4613aaa, 0 0 80px #d4613a55"]
                      : ["0 0 20px #d4613a66", "0 0 35px #d4613a44"],
                }}
                transition={{
                  y: { duration: 2.5 + ln.delay, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
                }}
                style={{
                  /* Lantern scales responsively; minimum usable on 320px */
                  width:  "clamp(38px, 9vw, 64px)",
                  height: "clamp(52px, 12vw, 86px)",
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
                  border: hovered === ln.key ? "1px solid rgba(245,213,110,0.4)" : "1px solid transparent",
                }}
              >
                <span style={{ fontSize: "clamp(14px, 3.5vw, 22px)", lineHeight: 1 }}>
                  {ln.emoji}
                </span>
                {/* Inner glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 5,
                    borderRadius: "30%",
                    background: "radial-gradient(circle, rgba(255,220,130,0.4), transparent)",
                    animation: "pulse-glow 2s infinite",
                  }}
                />
              </motion.div>

              {/* Tassel */}
              <div style={{ width: 2, height: 8, background: "#d4613a", opacity: 0.8 }} />
              <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 1, height: 6, background: "#d4613a", opacity: 0.6 }} />
                ))}
              </div>

              {/* Label – wraps naturally, centred */}
              <motion.span
                animate={{ opacity: hovered === ln.key ? 1 : 0.8 }}
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  /*
                    On 320px each col is ≈72px → font ~11px is readable.
                    On 390px each col is ≈87px → font ~13px.
                    Desktop stays at 0.85rem.
                  */
                  fontSize: "clamp(0.62rem, 3vw, 0.85rem)",
                  fontWeight: 500,
                  letterSpacing: "0px",
                  color: hovered === ln.key ? "#f5d56e" : "#fdf4e3",
                  textShadow: hovered === ln.key ? "0 0 10px rgba(245,213,110,0.6)" : "none",
                  transition: "all 0.3s",
                  textAlign: "center",
                  lineHeight: 1.35,
                  /* Allow wrapping, prevent overflow */
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%",
                  display: "block",
                  /* Bottom padding so text isn't flush with screen edge */
                  paddingBottom: 4,
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
