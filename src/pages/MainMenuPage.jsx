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
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

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
  const volumeControlRef = useRef(null);

  useEffect(() => {
    const storedMuteState = localStorage.getItem("isMuted");
    if (storedMuteState !== null) {
      setIsMuted(storedMuteState === "true");
    }

    const storedVolume = localStorage.getItem("volumeLevel");
    if (storedVolume !== null) {
      setVolume(parseFloat(storedVolume));
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ username: currentUser.displayName || "User" });

        // Set up a real-time listener for the score
        const userDocRef = doc(db, "scores", currentUser.uid);
        const unsubscribeScore = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setScore(docSnap.data().highestScore || 0);
          } else {
            setScore(0);
          }
        });

        return () => unsubscribeScore();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showVolumeControl && volumeControlRef.current && !volumeControlRef.current.contains(event.target)) {
        setShowVolumeControl(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeControl]);

  const toggleSound = () => {
    setIsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem("isMuted", newState);
      return newState;
    });
  };

  const handleMouseDown = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
    }
    setHoldTimeout(setTimeout(() => {
      setShowVolumeControl(true);
    }, 500)); // Show after 2 seconds of holding
  };

  const handleMouseUp = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
    }
  };
  
  const handleInteractionEnd = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
    }
    setHoldTimeout(setTimeout(() => {
      setShowVolumeControl(false);
    }, 2000)); // Hide after 2 seconds of inactivity
  };

  const handleVolumeAdjust = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    localStorage.setItem("volumeLevel", newVolume);

    // Prevent hiding while adjusting
    if (holdTimeout) {
      clearTimeout(holdTimeout);
    }
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
            <div ref={volumeControlRef}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeAdjust}
                onMouseDown={handleMouseDown}
                onMouseUp={handleInteractionEnd}
                onMouseLeave={handleInteractionEnd}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleInteractionEnd}
                className="w-24"
              />
            </div>
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