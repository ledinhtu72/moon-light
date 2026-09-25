import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Resolve path correctly regardless of deployment base (localhost vs /moon-light/)
  const audioSrc = `${import.meta.env.BASE_URL}music/background.mp3`;

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.warn("Audio play failed:", err);
          setCanPlay(false);
        });
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="none"
        onError={() => setCanPlay(false)}
      />

      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={
          !canPlay
            ? "Thêm file nhạc vào /public/music/background.mp3"
            : playing
              ? "Tắt nhạc"
              : "Bật nhạc"
        }
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 50,
          padding: "8px 16px",
          color: "#f5d56e",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontFamily: "'Be Vietnam Pro', sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        {playing ? (
          <>
            <Volume2 size={15} />
            <span>Nhạc</span>
            {/* Animated bars */}
            <span style={{ display: "flex", gap: 2, alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 3,
                    background: "#f5d56e",
                    borderRadius: 2,
                    animation: `musicBar 0.8s ${i * 0.15}s infinite alternate`,
                    height: 8,
                  }}
                />
              ))}
            </span>
          </>
        ) : (
          <>
            <VolumeX size={15} />
            <span>Nhạc</span>
          </>
        )}
      </motion.button>

      <style>{`
        @keyframes musicBar {
          from { height: 4px; }
          to { height: 12px; }
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
