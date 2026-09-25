import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import SkyCanvas from "./SkyCanvas";

interface LikesScreenProps {
  onBack: () => void;
}

interface Card {
  id: number;
  title: string;
  content: string;
  accentColor: string;
}

const CARDS: Card[] = [
  {
    id: 1,
    title: "Nụ cười của em",
    content:
      "Có những lúc em cười rất bình thường,\nnhưng chẳng hiểu sao anh lại nhớ rất lâu.",
    accentColor: "#c0394f",
  },
  {
    id: 2,
    title: "Cách em quan tâm",
    content:
      "Những điều nhỏ nhỏ em làm đôi khi\nkhiến anh cảm thấy mình thật may mắn.",
    accentColor: "#c9a227",
  },
  {
    id: 3,
    title: "Những cuộc nói chuyện",
    content:
      "Có những chuyện chẳng có gì đặc biệt,\nnhưng nói với em lại thấy vui.",
    accentColor: "#8b5cf6",
  },
  {
    id: 4,
    title: "Sự đáng yêu của em",
    content:
      "Cái này thì chắc anh không cần giải thích nữa rồi. ❤️",
    accentColor: "#d4613a",
  },
  {
    id: 5,
    title: "Và còn rất nhiều điều...",
    content: "Mà có lẽ anh sẽ từ từ kể cho em nghe.",
    accentColor: "#f5d56e",
  },
];

// Floating heart/particle
const FloatingParticle: React.FC<{
  x: number;
  y: number;
  delay: number;
  type: "heart" | "star";
}> = ({ x, y, delay, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.7, 0],
      y: -80,
      scale: [0, 1, 0.5],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 2,
      ease: "easeOut",
    }}
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      fontSize: type === "heart" ? 14 : 12,
      pointerEvents: "none",
      zIndex: 2,
    }}
  >
    {type === "heart" ? "❤️" : "✨"}
  </motion.div>
);

// Individual flip card
const LikeCard: React.FC<{ card: Card; index: number }> = ({ card, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000, cursor: "pointer" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "relative",
          width: "100%",
          transformStyle: "preserve-3d",
          minHeight: 160,
        }}
      >
        {/* ─── FRONT ─── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${card.accentColor}44`,
            borderRadius: 20,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            minHeight: 160,
            boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)`,
            transition: "box-shadow 0.3s",
          }}
        >
          {/* Accent glow top-left */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${card.accentColor}22, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          {/* Card number badge */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 16,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "0.7rem",
              color: `${card.accentColor}99`,
              letterSpacing: "1px",
            }}
          >
            {String(card.id).padStart(2, "0")}
          </div>

          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${card.accentColor}33, ${card.accentColor}11)`,
              border: `1px solid ${card.accentColor}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            ❤️
          </div>

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              color: "#fdf4e3",
              textAlign: "center",
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            {card.title}
          </p>

          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(245,213,110,0.5)",
              letterSpacing: "0.5px",
            }}
          >
            Chạm để xem ✦
          </p>
        </div>

        {/* ─── BACK ─── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(145deg, ${card.accentColor}22 0%, rgba(10,14,26,0.95) 100%)`,
            border: `1px solid ${card.accentColor}55`,
            borderRadius: 20,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            minHeight: 160,
            boxShadow: `0 8px 32px ${card.accentColor}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {/* Decorative top line */}
          <div
            style={{
              width: 32,
              height: 2,
              borderRadius: 1,
              background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
              marginBottom: 4,
            }}
          />
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(0.88rem, 2vw, 0.98rem)",
              color: "#fdf4e3",
              textAlign: "center",
              lineHeight: 1.85,
              whiteSpace: "pre-line",
              fontStyle: "italic",
            }}
          >
            {card.content}
          </p>
          <div
            style={{
              width: 32,
              height: 2,
              borderRadius: 1,
              background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
              marginTop: 4,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const LikesScreen: React.FC<LikesScreenProps> = ({ onBack }) => {
  // Particles config – static to avoid re-render jitter
  const particles = React.useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        delay: Math.random() * 4,
        type: (i % 3 === 0 ? "star" : "heart") as "heart" | "star",
      })),
    []
  );

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 40% 10%, #1e1530 0%, #0a0e1a 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Starry sky – same as other screens */}
      <SkyCanvas />

      {/* Soft golden overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(245,213,110,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} x={p.x} y={p.y} delay={p.delay} type={p.type} />
      ))}

      {/* Back button */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 50,
          padding: "8px 16px",
          color: "#fdf4e3",
          cursor: "pointer",
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: "0.85rem",
        }}
      >
        <ChevronLeft size={16} />
        Quay lại
      </motion.button>

      {/* ─── Scrollable content ─── */}
      <div
        className="scrollable"
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
          zIndex: 5,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 clamp(16px, 4vw, 40px) 40px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          style={{ textAlign: "center", paddingTop: "10vh", marginBottom: 32 }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(0.75rem, 1.8vw, 0.9rem)",
              color: "rgba(245,213,110,0.7)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ❤️ Điều Anh Thích
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
              color: "#fdf4e3",
              fontWeight: 400,
              marginBottom: 16,
              lineHeight: 1.3,
            }}
          >
            Những điều anh thích ở em ❤️
          </h2>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              color: "rgba(253,244,227,0.55)",
              fontStyle: "italic",
              lineHeight: 1.7,
            }}
          >
            Có những điều rất nhỏ thôi,
            <br />
            nhưng lại khiến anh nhớ rất lâu.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "clamp(14px, 2.5vw, 24px)",
            maxWidth: 860,
            margin: "0 auto",
          }}
        >
          {CARDS.map((card, i) => (
            <LikeCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          style={{
            textAlign: "center",
            maxWidth: 480,
            margin: "48px auto 0",
            padding: "32px 24px",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(245,213,110,0.15)",
            borderRadius: 24,
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#fdf4e3",
              marginBottom: 16,
              lineHeight: 1.6,
            }}
          >
            ❤️ Còn rất nhiều điều anh thích ở em...
          </p>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
              color: "rgba(253,244,227,0.6)",
              fontStyle: "italic",
              lineHeight: 1.75,
              marginBottom: 28,
            }}
          >
            Nhưng chắc anh phải để dành để kể cho em nghe từng chút một.
          </p>

          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            style={{ fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
          >
            Quay lại đêm Trung Thu
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LikesScreen;
