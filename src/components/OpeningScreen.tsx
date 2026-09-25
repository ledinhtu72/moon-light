import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkyCanvas from "./SkyCanvas";
import { CONFIG } from "../config";

interface OpeningScreenProps {
  onStart: () => void;
}

const TypewriterText: React.FC<{ lines: string[]; onDone: () => void }> = ({
  lines,
  onDone,
}) => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setTimeout(() => {
        setDone(true);
        onDone();
      }, 600);
      return;
    }
    if (currentChar <= lines[currentLine].length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = lines[currentLine].slice(0, currentChar);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, onDone]);

  return (
    <div style={{ textAlign: "center" }}>
      {lines.map((_, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i <= currentLine ? 1 : 0 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "#fdf4e3",
            lineHeight: 1.8,
            textShadow: "0 0 30px rgba(245,213,110,0.4)",
            marginBottom: i === 0 ? 8 : 0,
          }}
        >
          {displayed[i] || ""}
          {i === currentLine && !done && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: "1.2em",
                background: "#f5d56e",
                marginLeft: 2,
                verticalAlign: "middle",
                animation: "blink 1s infinite",
              }}
            />
          )}
        </motion.p>
      ))}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
};

// Lantern component
const Lantern: React.FC<{ side: "left" | "right"; index: number }> = ({
  side,
  index,
}) => {
  const colors = ["#d4613a", "#c0394f", "#8b1a2e", "#b8860b"];
  const color = colors[index % colors.length];
  const x = side === "left" ? `${8 + index * 6}%` : `${86 - index * 6}%`;
  const y = `${15 + index * 12}%`;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 3 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    >
      {/* String */}
      <div
        style={{
          width: 1,
          height: 20,
          background: "rgba(245,213,110,0.4)",
          margin: "0 auto",
        }}
      />
      {/* Lantern body */}
      <div
        style={{
          width: 24,
          height: 36,
          background: `radial-gradient(ellipse at 50% 30%, ${color}ee, ${color}88)`,
          borderRadius: "40% 40% 50% 50%",
          boxShadow: `0 0 20px ${color}88, 0 0 40px ${color}44`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow inside */}
        <div
          style={{
            width: 10,
            height: 16,
            background: `radial-gradient(circle, rgba(255,220,100,0.8), transparent)`,
            borderRadius: "50%",
            animation: "pulse-glow 2s infinite",
          }}
        />
      </div>
      {/* Tassel */}
      <div
        style={{
          width: 1,
          height: 12,
          background: color,
          margin: "0 auto",
          opacity: 0.8,
        }}
      />
    </motion.div>
  );
};

const OpeningScreen: React.FC<OpeningScreenProps> = ({ onStart }) => {
  const [textDone, setTextDone] = useState(false);
  const [moonClicks, setMoonClicks] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const handleMoonClick = () => {
    const next = moonClicks + 1;
    setMoonClicks(next);
    if (next >= 3) {
      setEasterEggActive(true);
      setTimeout(() => {
        setEasterEggActive(false);
        setMoonClicks(0);
      }, 3000);
    }
  };

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 50% 0%, #1a2a4a 0%, #0a0e1a 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <SkyCanvas />

      {/* Lanterns */}
      {[0, 1, 2].map((i) => (
        <Lantern key={`left-${i}`} side="left" index={i} />
      ))}
      {[0, 1, 2].map((i) => (
        <Lantern key={`right-${i}`} side="right" index={i} />
      ))}

      {/* Moon */}
      <motion.div
        onClick={handleMoonClick}
        animate={
          easterEggActive ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}
        }
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "clamp(100px, 20vw, 160px)",
            height: "clamp(100px, 20vw, 160px)",
            borderRadius: "50%",
            background: easterEggActive
              ? "radial-gradient(circle at 40% 35%, #ff8fa3, #c0394f)"
              : "radial-gradient(circle at 40% 35%, #fff9dc, #f5d56e 50%, #e8b84b)",
            boxShadow: easterEggActive
              ? "0 0 40px #c0394f88, 0 0 80px #c0394f44, 0 0 120px #c0394f22"
              : "0 0 40px rgba(245,213,110,0.6), 0 0 80px rgba(245,213,110,0.3), 0 0 150px rgba(245,213,110,0.15)",
            transition: "all 0.5s ease",
          }}
        />

        {/* Easter egg heart shape */}
        <AnimatePresence>
          {easterEggActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(40px, 8vw, 60px)",
              }}
            >
              ❤️
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Easter egg message */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: "32%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(139,26,46,0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(192,57,79,0.5)",
              borderRadius: 16,
              padding: "12px 24px",
              color: "#fdf4e3",
              fontFamily: "'Lora', serif",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              zIndex: 50,
            }}
          >
            {CONFIG.easterEgg.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg hearts burst */}
      <AnimatePresence>
        {easterEggActive && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: "50vw", y: "20vh", scale: 0 }}
                animate={{
                  opacity: 0,
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 80}vh`,
                  scale: Math.random() * 1.5 + 0.5,
                }}
                transition={{ duration: 2, delay: Math.random() * 0.5 }}
                style={{
                  position: "fixed",
                  fontSize: `${Math.random() * 20 + 10}px`,
                  pointerEvents: "none",
                  zIndex: 100,
                }}
              >
                ❤️
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main text */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          marginTop: "28vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <TypewriterText
            lines={[CONFIG.opening.line1, CONFIG.opening.line2]}
            onDone={() => setTextDone(true)}
          />
        </motion.div>

        <AnimatePresence>
          {textDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ marginTop: 40 }}
            >
              <button
                className="btn-primary"
                onClick={onStart}
                style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)" }}
              >
                {CONFIG.opening.buttonText}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(to top, rgba(10,14,26,0.8), transparent)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
};

export default OpeningScreen;
