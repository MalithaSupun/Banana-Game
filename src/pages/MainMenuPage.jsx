import React, { useState } from "react";
import HomePageBg from "../assets/MainMenuBg.png"; 
import InstructionPage from "./InstructionsPage"; 
import LeaderBoardPage from "./LeaderBoardPage";
import LevelSelectionPage from "./LevelSelectionPage";
import HomeButton from "../components/HomeButton";
import Logout from "../components/LogoutButton";
import WelcomePage from "./WelcomePage";

function MainMenuPage() {
  const [activePage, setActivePage] = useState(null); // Manage which page to show

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
        <h2 className="text-[#4E2500] font-bold text-xl">Malitha Supun</h2>
        <p className="text-[#4E2500] font-bold text-lg mt-2">
          Score: <span className="text-black text-2xl">28000</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col mt-6 w-full space-y-4">
          <button
            className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full"
            onClick={() => setActivePage("leaderboard")} // Show Leaderboard Page
          >
            Leader board
          </button>
          <button
            className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full"
            onClick={() => setActivePage("instruction")} // Show Instruction Page
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
          <LevelSelectionPage />
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