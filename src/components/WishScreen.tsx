import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Send } from "lucide-react";
import { CONFIG } from "../config";
import SkyCanvas from "./SkyCanvas";

interface WishScreenProps {
  onBack: () => void;
}

interface FlyingStar {
  id: number;
  x: number;
  y: number;
  text: string;
}

const WishScreen: React.FC<WishScreenProps> = ({ onBack }) => {
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [flyingStar, setFlyingStar] = useState<FlyingStar | null>(null);
  const [moonGlow, setMoonGlow] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!wish.trim()) return;
    // Animate star flying up
    setFlyingStar({ id: Date.now(), x: 50, y: 70, text: wish });
    setSubmitted(true);

    setTimeout(() => {
      setMoonGlow(true);
    }, 1500);

    setTimeout(() => {
      setFlyingStar(null);
      setShowResponse(true);
    }, 2500);
  };

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 50% 20%, #14203a 0%, #0a0e1a 70%)",
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

      {/* Moon */}
      <motion.div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
        animate={moonGlow ? { scale: [1, 1.3, 1.15] } : { scale: [1, 1.03, 1] }}
        transition={
          moonGlow
            ? { duration: 1.5, ease: "easeOut" }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div
          style={{
            width: "clamp(90px, 15vw, 130px)",
            height: "clamp(90px, 15vw, 130px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 35%, #fff9dc, #f5d56e 50%, #e8b84b)",
            boxShadow: moonGlow
              ? "0 0 80px rgba(245,213,110,0.9), 0 0 160px rgba(245,213,110,0.5), 0 0 250px rgba(245,213,110,0.25)"
              : "0 0 40px rgba(245,213,110,0.5), 0 0 80px rgba(245,213,110,0.2)",
            transition: "box-shadow 1.5s ease",
          }}
        />
      </motion.div>

      {/* Flying star animation */}
      <AnimatePresence>
        {flyingStar && (
          <motion.div
            initial={{ x: "50vw", y: "70vh", scale: 0.5, opacity: 0 }}
            animate={{
              x: "50vw",
              y: "15vh",
              scale: 1.5,
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              position: "fixed",
              zIndex: 50,
              fontSize: 24,
              pointerEvents: "none",
              transformOrigin: "center",
            }}
          >
            ⭐
          </motion.div>
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
          padding: "clamp(16px, 4vw, 40px)",
          position: "relative",
          zIndex: 5,
          marginTop: "20vh",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <AnimatePresence mode="wait">
          {!showResponse ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ width: "100%", textAlign: "center" }}
            >
              {/* Title */}
              <motion.h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                  color: "#fdf4e3",
                  fontWeight: 400,
                  marginBottom: 12,
                  textShadow: "0 0 30px rgba(245,213,110,0.3)",
                }}
              >
                {CONFIG.wish.title}
              </motion.h2>

              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
                  color: "rgba(253,244,227,0.6)",
                  fontStyle: "italic",
                  marginBottom: 40,
                }}
              >
                Hãy viết điều ước của em xuống đây...
              </p>

              {/* Input form */}
              <AnimatePresence>
                {!submitted && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(245,213,110,0.2)",
                      borderRadius: 20,
                      padding: "clamp(20px, 4vw, 32px)",
                      width: "100%",
                    }}
                  >
                    <input
                      ref={inputRef}
                      value={wish}
                      onChange={(e) => setWish(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      placeholder={CONFIG.wish.placeholder}
                      maxLength={200}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(245,213,110,0.25)",
                        borderRadius: 12,
                        padding: "14px 20px",
                        color: "#fdf4e3",
                        fontFamily: "'Lora', serif",
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        outline: "none",
                        marginBottom: 16,
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(245,213,110,0.6)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(245,213,110,0.25)")
                      }
                    />

                    <motion.button
                      onClick={handleSubmit}
                      disabled={!wish.trim()}
                      whileHover={wish.trim() ? { scale: 1.03 } : {}}
                      whileTap={wish.trim() ? { scale: 0.97 } : {}}
                      style={{
                        width: "100%",
                        background: wish.trim()
                          ? "linear-gradient(135deg, #c9a227, #f5d56e)"
                          : "rgba(255,255,255,0.1)",
                        border: "none",
                        borderRadius: 12,
                        padding: "14px 24px",
                        color: wish.trim()
                          ? "#0a0e1a"
                          : "rgba(255,255,255,0.3)",
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        cursor: wish.trim() ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "all 0.3s",
                      }}
                    >
                      <Send size={16} />
                      {CONFIG.wish.buttonText}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {submitted && !showResponse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    color: "rgba(245,213,110,0.8)",
                    fontFamily: "'Lora', serif",
                    fontSize: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  <div style={{ fontSize: 32 }}>⭐</div>
                  <p>Điều ước đang bay lên bầu trời...</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Response */
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                textAlign: "center",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,213,110,0.2)",
                borderRadius: 24,
                padding: "clamp(24px, 5vw, 48px)",
                width: "100%",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                style={{ fontSize: 48, marginBottom: 24 }}
              >
                ⭐
              </motion.div>

              {CONFIG.wish.response.split("\n\n").map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.3, duration: 0.6 }}
                  style={{
                    fontFamily:
                      i === 0 ? "'Lora', serif" : "'Playfair Display', serif",
                    fontSize: "clamp(0.9rem, 2.2vw, 1.1rem)",
                    color: i === 0 ? "rgba(253,244,227,0.8)" : "#fdf4e3",
                    lineHeight: 1.8,
                    marginBottom: i < 1 ? 20 : 0,
                    fontStyle: i === 0 ? "italic" : "normal",
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Stars burst */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.cos((i / 8) * Math.PI * 2) * 80,
                    y: Math.sin((i / 8) * Math.PI * 2) * 80,
                    scale: [0, 1, 0],
                  }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 1.5 }}
                  style={{
                    position: "absolute",
                    fontSize: 16,
                    pointerEvents: "none",
                  }}
                >
                  ✨
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WishScreen;
