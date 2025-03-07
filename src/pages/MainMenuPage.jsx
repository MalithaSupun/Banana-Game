import React, { useState, useEffect, useRef } from "react";
import HomePageBg from "../assets/MainMenuBg.png";
import InstructionPage from "./InstructionsPage";
import GamePage from "./GamePage";
import LeaderBoardPage from "./LeaderBoardPage";
import LevelSelectionPage from "./LevelSelectionPage";
import HomeButton from "../components/HomeButton";
import Logout from "../components/LogoutButton";
import WelcomePage from "./WelcomePage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GameSoundLoop from "../assets/GameSoundLoop.mp3";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function MainMenuPage() {
  const [activePage, setActivePage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("medium"); // Default level
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Default volume at max
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedMuteState = localStorage.getItem("isMuted");
    if (storedMuteState !== null) {
      setIsMuted(storedMuteState === "true");
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({ username: currentUser.displayName || "User" });

        // Fetch user score from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setScore(docSnap.data().score || 0);
        } else {
          setScore(0);
        }
      } else {
        setUser(null);
        setScore(0);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      if (!isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, volume]);

  const toggleSound = () => {
    setIsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem("isMuted", newState);
      return newState;
    });
  };

  const handleMouseDown = () => {
    const timeout = setTimeout(() => {
      setShowVolumeControl(true);
    }, 1000); // 4 seconds
    setHoldTimeout(timeout);
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimeout);
    setHoldTimeout(null);
  };

  const handleVolumeAdjust = (event) => {
    setVolume(event.target.value);
    setTimeout(() => setShowVolumeControl(false), 2000); // Hide after 2 sec
  };

  return (
    <div
      className="flex min-h-screen w-full bg-cover bg-center font-dancingScript"
      style={{ backgroundImage: `url(${HomePageBg})` }}
    >
      {/* Sidebar */}
      <div className="flex flex-col items-center bg-fourthcolor w-1/4 min-h-screen p-6 shadow-lg border-r border-black">
        {/* Profile Icon */}
        <div className="bg-secondary w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 border-black">
          <span className="text-4xl text-black">👤</span>
        </div>

        {/* Username & Score */}
        {user ? (
          <>
            <h2 className="text-[#4E2500] font-bold text-xl">{user.username}</h2>
            <p className="text-[#4E2500] font-bold text-lg mt-2">
              Score: <span className="text-black text-2xl">{score}</span>
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        {/* Buttons */}
        <div className="flex flex-col mt-6 w-full space-y-4">
          <button
            className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full"
            onClick={() => setActivePage("leaderboard")}
          >
            Leader board
          </button>
          <button
            className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full"
            onClick={() => setActivePage("instruction")}
          >
            Instruction
          </button>
          <button
            className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full"
            onClick={() => setActivePage("levelSelection")}
          >
            Play
          </button>
        </div>

        {/* Mute/Unmute and Logout */}
        <div className="mt-auto w-full flex justify-center space-x-4 items-center">
          <Logout />
          <button
            className="bg-secondary text-black font-bold text-2xl py-2 px-4 rounded-lg shadow-lg"
            onClick={toggleSound}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {isMuted ? "Unmute 🔈" : "Mute 🔇"}
          </button>
          {showVolumeControl && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeAdjust}
              className="w-24"
            />
          )}
        </div>
      </div>

      {/* Dynamic Content Area (Right Side) */}
      <div className="flex-1 p-8">
        {activePage === "leaderboard" ? (
          <LeaderBoardPage />
        ) : activePage === "instruction" ? (
          <InstructionPage />
        ) : activePage === "levelSelection" ? (
          <LevelSelectionPage
            onLevelSelect={(level) => {
              setSelectedLevel(level);
              setActivePage("game");
            }}
          />
        ) : activePage === "game" ? (
          <GamePage selectedLevel={selectedLevel} />
        ) : (
          <WelcomePage />
        )}
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={GameSoundLoop} />

      {/* Home Button (Top Right) */}
      <HomeButton />
    </div>
  );
}

export default MainMenuPage;