import React from "react";
import { useNavigate } from "react-router-dom";
import BottomRightImage from "../assets/MainMenuBanana.png";

function LevelSelectionPage() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start justify-start h-full w-full  bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      {/* Header Section */}
      <div className="bg-primary p-4 rounded-lg mb-6 w-fit text-left">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3">
          Levels
        </h2>
      </div>

      {/* Level Selection Box */}
      <div className="bg-[#F5E8C7] p-8 rounded-lg shadow-lg w-[700px]">
        <h3 className="text-5xl font-bold text-red-600 italic font-dancingScript text-center">
          Choose difficulty
        </h3>

        {/* Difficulty Levels */}
        <div className="flex flex-col space-y-4 mt-10">
          <button className="bg-[#A8D1E7] text-black font-bold text-4xl px-6 py-7 rounded-lg shadow-lg hover:bg-blue-400 flex items-center justify-center space-x-3 z-10">
            <span>🍌</span>
            <span>Sweet & Simple - Easy level</span>
          </button>

          <button className="bg-[#A8D1E7] text-black font-bold text-4xl px-6 py-7 rounded-lg shadow-lg hover:bg-blue-600 flex items-center justify-center space-x-3 z-10">
            <span>🍌</span>
            <span>Bana Clever - Medium level</span>
          </button>

          <button 
          onClick={() => navigate("/game")}
          className="bg-[#FF8888] text-black font-bold text-4xl px-6 py-7 rounded-lg shadow-lg hover:bg-red-600 flex items-center justify-center space-x-3 z-10">
            <span>🔥</span>
            <span>Ultimate Whiz - Hard level</span>
          </button>
        </div>
      </div>
      {/* Bottom Right Image */}
      <img
        src={BottomRightImage}
        alt="Decorative"
        className="absolute bottom-4 right-4 max-w-xl max-h-xl object-contain"
      />
    </div>
  );
}

export default LevelSelectionPage;
