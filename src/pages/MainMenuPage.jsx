import React, { useState, useEffect } from "react";
import HomePageBg from "../assets/MainMenuBg.png";
import InstructionPage from "./InstructionsPage";
import GamePage from "./GamePage";
import LeaderBoardPage from "./LeaderBoardPage";
import LevelSelectionPage from "./LevelSelectionPage";
import HomeButton from "../components/HomeButton";
import Logout from "../components/LogoutButton";
import WelcomePage from "./WelcomePage";
import { getAuth } from "firebase/auth"; // To retrieve user data from Firebase
import { getFirestore, doc, getDoc } from "firebase/firestore"; // To retrieve score from Firestore

function MainMenuPage() {
  const [activePage, setActivePage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("medium"); // Default level
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0); // Default score is 0

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Fetch username from Firebase Authentication
      setUser({
        username: currentUser.displayName || "User", // Default username if displayName is not set
      });

      // Fetch user score from Firestore (or another database)
      const db = getFirestore();
      const userDocRef = doc(db, "users", currentUser.uid); // Assuming users are stored in a 'users' collection
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          setScore(docSnap.data().score || 0); // Use 0 if score is not found in the document
        } else {
          setScore(0); // If user document doesn't exist, set score to 0
        }
      });
    }
  }, []);

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
          <p>Loading...</p> // If user data is not loaded yet
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

        {/* Pushes Logout to the Bottom */}
        <div className="mt-auto w-full flex justify-center">
          <Logout />
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
              setActivePage("game"); // Move to game after level selection
            }}
          />
        ) : activePage === "game" ? (
          <GamePage selectedLevel={selectedLevel} />
        ) : (
          <WelcomePage />
        )}
      </div>

      {/* Home Button (Top Right) */}
      <HomeButton />
    </div>
  );
}

export default MainMenuPage;