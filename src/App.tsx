import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import OpeningScreen from "./components/OpeningScreen";
import PathScreen from "./components/PathScreen";
import type { LanternKey } from "./components/PathScreen";
import LikesScreen from "./components/LikesScreen";
import LetterScreen from "./components/LetterScreen";
import WishScreen from "./components/WishScreen";
import GiftScreen from "./components/GiftScreen";
import MusicPlayer from "./components/MusicPlayer";
import "./index.css";

type Screen = "opening" | "path" | "likes" | "letter" | "wish" | "gift";

function App() {
  const [screen, setScreen] = useState<Screen>("opening");

  const handleLanternSelect = (key: LanternKey) => {
    setScreen(key as Screen);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Music player always visible */}
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {screen === "opening" && (
          <div key="opening" style={{ position: "absolute", inset: 0 }}>
            <OpeningScreen onStart={() => setScreen("path")} />
          </div>
        )}

        {screen === "path" && (
          <div key="path" style={{ position: "absolute", inset: 0 }}>
            <PathScreen onSelect={handleLanternSelect} />
          </div>
        )}

        {screen === "likes" && (
          <div key="likes" style={{ position: "absolute", inset: 0 }}>
            <LikesScreen onBack={() => setScreen("path")} />
          </div>
        )}

        {screen === "letter" && (
          <div key="letter" style={{ position: "absolute", inset: 0 }}>
            <LetterScreen onBack={() => setScreen("path")} />
          </div>
        )}

        {screen === "wish" && (
          <div key="wish" style={{ position: "absolute", inset: 0 }}>
            <WishScreen onBack={() => setScreen("path")} />
          </div>
        )}

        {screen === "gift" && (
          <div key="gift" style={{ position: "absolute", inset: 0 }}>
            <GiftScreen onBack={() => setScreen("path")} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
