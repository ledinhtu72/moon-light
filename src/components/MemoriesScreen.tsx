import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { CONFIG } from "../config";
import SkyCanvas from "./SkyCanvas";

interface MemoriesScreenProps {
  onBack: () => void;
}

const MemoriesScreen: React.FC<MemoriesScreenProps> = ({ onBack }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const memories = CONFIG.memories;

  const getRotation = (i: number) => {
    const rotations = [-3, 2, -1.5, 3, -2, 1.5];
    return rotations[i % rotations.length];
  };

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 30% 20%, #1a2540 0%, #0a0e1a 70%)",
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
          🏮 Kỷ Niệm
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
            color: "#fdf4e3",
            fontWeight: 400,
          }}
        >
          Những khoảnh khắc của chúng mình
        </h2>
      </motion.div>

      {/* Desktop: Polaroid grid */}
      <div
        className="scrollable"
        style={{
          flex: 1,
          width: "100%",
          padding: "clamp(16px, 4vw, 40px)",
          paddingTop: 24,
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Desktop grid */}
        <div
          style={{
            display: "none",
          }}
          className="desktop-grid"
        ></div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 45vw), 1fr))",
            gap: "clamp(16px, 3vw, 32px)",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {memories.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: getRotation(i) }}
              animate={{ opacity: 1, y: 0, rotate: getRotation(i) }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              onClick={() => setSelected(i)}
              style={{
                background: "#fdf4e3",
                borderRadius: 4,
                padding: "12px 12px 40px",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                position: "relative",
              }}
            >
              {/* Photo area */}
              <div
                style={{
                  width: "100%",
                  paddingTop: "100%",
                  position: "relative",
                  background: m.image
                    ? undefined
                    : "linear-gradient(135deg, #1a2035, #0f1629)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.caption}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: 16,
                    }}
                  >
                    <div style={{ fontSize: 28, opacity: 0.5 }}>📷</div>
                    <p
                      style={{
                        color: "rgba(245,213,110,0.6)",
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: "0.7rem",
                        textAlign: "center",
                        lineHeight: 1.4,
                      }}
                    >
                      Thay ảnh này bằng ảnh của chúng mình ❤️
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: "0.65rem",
                        textAlign: "center",
                      }}
                    >
                      {m.placeholder}
                    </p>
                  </div>
                )}

                {/* Hover glow overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(245,213,110,0.15), transparent)",
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* Caption */}
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                  color: "#3a2a1a",
                  textAlign: "center",
                  marginTop: 10,
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                {m.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            color: "rgba(253,244,227,0.7)",
            textAlign: "center",
            maxWidth: 500,
            margin: "32px auto 24px",
            lineHeight: 1.8,
            fontStyle: "italic",
            whiteSpace: "pre-line",
          }}
        >
          {CONFIG.memoriesClosing}
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fdf4e3",
                borderRadius: 4,
                padding: "16px 16px 48px",
                maxWidth: 400,
                width: "90%",
                boxShadow: "0 20px 80px rgba(0,0,0,0.8)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: "100%",
                  position: "relative",
                  background: memories[selected].image
                    ? undefined
                    : "linear-gradient(135deg, #1a2035, #0f1629)",
                  borderRadius: 2,
                }}
              >
                {memories[selected].image ? (
                  <img
                    src={memories[selected].image}
                    alt={memories[selected].caption}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: 20,
                    }}
                  >
                    <div style={{ fontSize: 40, opacity: 0.5 }}>📷</div>
                    <p
                      style={{
                        color: "rgba(245,213,110,0.6)",
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      Thay ảnh này bằng ảnh của chúng mình ❤️
                    </p>
                  </div>
                )}
              </div>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "0.9rem",
                  color: "#3a2a1a",
                  textAlign: "center",
                  marginTop: 16,
                  fontStyle: "italic",
                }}
              >
                {memories[selected].caption}
              </p>

              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#8b1a2e",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoriesScreen;
