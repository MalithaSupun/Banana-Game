import React, { useState } from "react";
import HomePageBg from "../assets/MainMenuBg.png"; // Import background image
import InstructionPage from "./InstructionsPage"; // Import the instruction page
import HomeButton from "../components/HomeButton";
import Logout from "../components/LogoutButton";

function MainMenuPage() {
  const [showInstruction, setShowInstruction] = useState(false);

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
          <button className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full">
            Leader board
          </button>
          <button
            className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full"
            onClick={() => setShowInstruction(true)} // Show Instruction Page
          >
            Instruction
          </button>
          <button className="bg-secondary text-black font-bold text-2xl py-5 rounded-lg shadow-lg w-full">
            Play
          </button>
        </div>

        {/* Pushes Logout to the Bottom */}
        <div className="mt-auto w-full flex justify-center">
          <Logout />
        </div>
      </div>

      {/* Instruction Page Display (Right Side) */}
      <div className="flex-1 p-8">
        {showInstruction ? (
          <InstructionPage />
        ) : (
          <p className="text-black text-xl">Welcome to the Main Menu!</p>
        )}
      </div>

      {/* Home Button (Top Right) */}
      <HomeButton />
    </div>
  );
}

export default MainMenuPage;
