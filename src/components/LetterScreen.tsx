import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { CONFIG } from "../config";
import SkyCanvas from "./SkyCanvas";

interface LetterScreenProps {
  onBack: () => void;
}

const LetterScreen: React.FC<LetterScreenProps> = ({ onBack }) => {
  const [opened, setOpened] = useState(false);

  const letter = CONFIG.letter;

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 70% 20%, #1e2840 0%, #0a0e1a 70%)",
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
      <SkyCanvas />

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

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          textAlign: "center",
          marginTop: "8vh",
          position: "relative",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.75rem, 1.8vw, 0.9rem)",
            color: "rgba(245,213,110,0.7)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          🏮 Lời Muốn Nói
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.3rem, 3vw, 2rem)",
            color: "#fdf4e3",
            fontWeight: 400,
          }}
        >
          Một bức thư dưới ánh trăng
        </h2>
      </motion.div>

      {/* Table surface */}
      <div
        className="scrollable"
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px clamp(16px, 4vw, 40px)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <AnimatePresence mode="wait">
          {!opened ? (
            /* Envelope */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={() => setOpened(true)}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              {/* Envelope body */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                style={{
                  width: "clamp(220px, 40vw, 340px)",
                  height: "clamp(150px, 28vw, 240px)",
                  position: "relative",
                  filter: "drop-shadow(0 20px 60px rgba(139,26,46,0.4))",
                }}
              >
                {/* Envelope back */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(160deg, #8b1a2e 0%, #6b1020 100%)",
                    borderRadius: 8,
                  }}
                />

                {/* Envelope flap (top triangle) */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "55%",
                    background:
                      "linear-gradient(170deg, #a02535 0%, #7a1520 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    borderRadius: "8px 8px 0 0",
                  }}
                />

                {/* Left flap */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "52%",
                    height: "65%",
                    background: "linear-gradient(135deg, #7a1520, #6b1020)",
                    clipPath: "polygon(0 100%, 0 0, 100% 100%)",
                  }}
                />

                {/* Right flap */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "52%",
                    height: "65%",
                    background: "linear-gradient(225deg, #7a1520, #6b1020)",
                    clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
                  }}
                />

                {/* Bottom fold line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "35%",
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "rgba(255,255,255,0.1)",
                  }}
                />

                {/* Seal */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -30%)",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #c9a227, #8b6914)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    boxShadow: "0 4px 20px rgba(201,162,39,0.5)",
                    zIndex: 10,
                  }}
                >
                  ❤️
                </motion.div>

                {/* Moon light effect on envelope */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 20,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(245,213,110,0.12), transparent)",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>

              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  color: "rgba(253,244,227,0.7)",
                  fontStyle: "italic",
                }}
              >
                Chạm vào phong thư để mở ✦
              </p>
            </motion.div>
          ) : (
            /* Letter content */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                width: "100%",
                maxWidth: 600,
                background: "linear-gradient(160deg, #fdf4e3 0%, #f5e4c4 100%)",
                borderRadius: 4,
                padding: "clamp(24px, 5vw, 48px)",
                boxShadow:
                  "0 20px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,213,110,0.2)",
                position: "relative",
              }}
            >
              {/* Paper texture lines */}
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 20,
                    right: 20,
                    top: `${60 + i * 28}px`,
                    height: 1,
                    background: "rgba(100,60,30,0.06)",
                  }}
                />
              ))}

              {/* Moon watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 120,
                  opacity: 0.04,
                  pointerEvents: "none",
                }}
              >
                🌕
              </div>

              {/* Letter text */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Date / decorative */}
                <p
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
                    color: "#8b6914",
                    textAlign: "right",
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  Đêm Trung Thu 🌕
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    color: "#3a2010",
                    marginBottom: 20,
                    fontWeight: 600,
                  }}
                >
                  {letter.greeting}
                </motion.p>

                {letter.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "clamp(0.85rem, 2vw, 1rem)",
                      color: "#4a3020",
                      lineHeight: 1.9,
                      marginBottom: 16,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {para}
                  </motion.p>
                ))}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.4 + letter.paragraphs.length * 0.15 + 0.2,
                  }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    color: "#8b1a2e",
                    marginTop: 24,
                    fontStyle: "italic",
                    fontWeight: 600,
                  }}
                >
                  {letter.closing}
                </motion.p>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.4 + letter.paragraphs.length * 0.15 + 0.4,
                  }}
                  style={{
                    marginTop: 32,
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                      color: "#8b1a2e",
                      fontStyle: "italic",
                      borderBottom: "2px solid rgba(139,26,46,0.3)",
                      paddingBottom: 4,
                    }}
                  >
                    Anh ❤️
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LetterScreen;
