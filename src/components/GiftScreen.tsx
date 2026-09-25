import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { CONFIG } from "../config";
import SkyCanvas from "./SkyCanvas";

interface GiftScreenProps {
  onBack: () => void;
}

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: "circle" | "heart" | "star";
}

const GiftScreen: React.FC<GiftScreenProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<"idle" | "opening" | "revealed">("idle");
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const handleOpen = () => {
    setPhase("opening");
    setTimeout(() => {
      setPhase("revealed");
      // Generate confetti
      const items: Confetti[] = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: [
          "#f5d56e",
          "#c0394f",
          "#d4613a",
          "#fdf4e3",
          "#ff8fa3",
          "#8b1a2e",
        ][Math.floor(Math.random() * 6)],
        delay: Math.random() * 1.5,
        duration: Math.random() * 3 + 2,
        size: Math.random() * 14 + 6,
        shape: (["circle", "heart", "star"] as const)[
          Math.floor(Math.random() * 3)
        ],
      }));
      setConfetti(items);
    }, 2000);
  };

  const gift = CONFIG.gift;

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          phase === "opening"
            ? "radial-gradient(ellipse at 50% 50%, #2a1a30 0%, #050608 100%)"
            : "radial-gradient(ellipse at 50% 10%, #1a1530 0%, #0a0e1a 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        transition: "background 1.5s ease",
      }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SkyCanvas />

      {/* Back button */}
      {phase === "idle" && (
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
      )}

      {/* Confetti */}
      <AnimatePresence>
        {phase === "revealed" &&
          confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", opacity: [1, 1, 0], rotate: 720 }}
              transition={{
                duration: c.duration,
                delay: c.delay,
                ease: "linear",
              }}
              style={{
                position: "fixed",
                top: 0,
                zIndex: 60,
                fontSize: c.shape === "heart" ? c.size : undefined,
                width: c.shape !== "heart" ? c.size : undefined,
                height: c.shape !== "heart" ? c.size : undefined,
                borderRadius:
                  c.shape === "circle"
                    ? "50%"
                    : c.shape === "star"
                      ? 0
                      : undefined,
                background: c.shape !== "heart" ? c.color : undefined,
                color: c.color,
                pointerEvents: "none",
              }}
            >
              {c.shape === "heart" ? "❤️" : c.shape === "star" ? "✨" : null}
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Moon background - gets super bright during reveal */}
      <motion.div
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
        animate={
          phase === "revealed"
            ? { scale: 2.5, opacity: 0.95 }
            : phase === "opening"
              ? { scale: 1.5, opacity: 0.5 }
              : { scale: [1, 1.03, 1] }
        }
        transition={
          phase === "idle"
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 2, ease: "easeOut" }
        }
      >
        <div
          style={{
            width: "clamp(120px, 20vw, 180px)",
            height: "clamp(120px, 20vw, 180px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 35%, #fff9dc, #f5d56e 50%, #e8b84b)",
            boxShadow:
              phase === "revealed"
                ? "0 0 100px rgba(245,213,110,1), 0 0 200px rgba(245,213,110,0.7), 0 0 400px rgba(245,213,110,0.4)"
                : phase === "opening"
                  ? "0 0 60px rgba(245,213,110,0.7), 0 0 120px rgba(245,213,110,0.4)"
                  : "0 0 40px rgba(245,213,110,0.5), 0 0 80px rgba(245,213,110,0.2)",
            transition: "box-shadow 2s ease",
          }}
        />
      </motion.div>

      {/* Gold overlay during opening */}
      <AnimatePresence>
        {phase === "opening" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, times: [0, 0.5, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background:
                "radial-gradient(circle at center, rgba(245,213,110,0.3), transparent 60%)",
              zIndex: 55,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px clamp(16px, 4vw, 40px)",
          position: "relative",
          zIndex: 5,
          marginTop: "14vh",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{ textAlign: "center", width: "100%" }}
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
                🎁 Món Quà
              </p>

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.1rem, 2.8vw, 1.6rem)",
                  color: "#fdf4e3",
                  fontWeight: 400,
                  marginBottom: 48,
                  lineHeight: 1.6,
                }}
              >
                {gift.teaser}
              </p>

              {/* Gift box */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "relative",
                  display: "inline-block",
                  cursor: "pointer",
                  marginBottom: 40,
                }}
                onClick={handleOpen}
              >
                {/* Particles around gift */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: Math.cos((i / 8) * Math.PI * 2) * 60,
                      y: Math.sin((i / 8) * Math.PI * 2) * 60,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.25,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#f5d56e",
                      marginTop: -3,
                      marginLeft: -3,
                      pointerEvents: "none",
                    }}
                  />
                ))}

                {/* Box */}
                <div
                  style={{
                    width: "clamp(100px, 18vw, 140px)",
                    height: "clamp(100px, 18vw, 140px)",
                    background:
                      "linear-gradient(135deg, #8b1a2e 0%, #6b1020 100%)",
                    borderRadius: 12,
                    position: "relative",
                    boxShadow:
                      "0 0 40px rgba(139,26,46,0.5), 0 0 80px rgba(139,26,46,0.25)",
                  }}
                >
                  {/* Ribbon horizontal */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: 16,
                      background:
                        "linear-gradient(90deg, #c9a227, #f5d56e, #c9a227)",
                      transform: "translateY(-50%)",
                    }}
                  />
                  {/* Ribbon vertical */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 0,
                      width: 16,
                      background:
                        "linear-gradient(180deg, #c9a227, #f5d56e, #c9a227)",
                      transform: "translateX(-50%)",
                    }}
                  />
                  {/* Bow */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 32,
                    }}
                  >
                    🎀
                  </div>
                  {/* Inner glow */}
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 12,
                      background:
                        "radial-gradient(circle at center, rgba(245,213,110,0.3), transparent)",
                    }}
                  />
                </div>

                {/* Lid */}
                <div
                  style={{
                    position: "absolute",
                    top: "-16px",
                    left: "-6px",
                    right: "-6px",
                    height: 24,
                    background:
                      "linear-gradient(135deg, #a02535 0%, #7a1520 100%)",
                    borderRadius: "8px 8px 0 0",
                    boxShadow: "0 -4px 16px rgba(139,26,46,0.4)",
                  }}
                />
              </motion.div>

              <br />
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)" }}
              >
                {gift.buttonText}
              </motion.button>
            </motion.div>
          )}

          {phase === "opening" && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center" }}
            >
              {/* Animated opening box */}
              <motion.div
                animate={{ scale: [1, 1.3, 0.5], opacity: [1, 1, 0] }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{ fontSize: 80, marginBottom: 24 }}
              >
                🎁
              </motion.div>
              <motion.p
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.8 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                  color: "#f5d56e",
                }}
              >
                ✨ Đang mở...
              </motion.p>
            </motion.div>
          )}

          {phase === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ textAlign: "center", width: "100%" }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(245,213,110,0.25)",
                  borderRadius: 24,
                  padding: "clamp(28px, 6vw, 56px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Gold shimmer */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(45deg, transparent 30%, rgba(245,213,110,0.05) 50%, transparent 70%)",
                    animation: "shimmer 3s infinite",
                    backgroundSize: "200% 200%",
                    pointerEvents: "none",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                    color: "rgba(253,244,227,0.7)",
                    fontStyle: "italic",
                    marginBottom: 20,
                  }}
                >
                  {gift.revealLine1}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                    color: "rgba(253,244,227,0.7)",
                    fontStyle: "italic",
                    marginBottom: 32,
                  }}
                >
                  {gift.revealLine2}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.1rem, 2.8vw, 1.5rem)",
                    color: "#fdf4e3",
                    lineHeight: 1.8,
                    marginBottom: 40,
                    whiteSpace: "pre-line",
                    textShadow: "0 0 20px rgba(245,213,110,0.2)",
                  }}
                >
                  {gift.revealLine3}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, #c9a227, #f5d56e)",
                    borderRadius: 50,
                    padding: "12px 32px",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(0.9rem, 2.2vw, 1.1rem)",
                    color: "#0a0e1a",
                    fontWeight: 600,
                    boxShadow: "0 8px 30px rgba(245,213,110,0.4)",
                  }}
                >
                  {gift.closing}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GiftScreen;
