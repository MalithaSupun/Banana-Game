import React from "react";
import BottomRightImage from "../assets/MainMenuBanana.png";

function LevelSelectionPage({ onLevelSelect }) {
  return (
    <div className="flex flex-col items-start justify-start h-full w-full  bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      {/* Header */}
      <div className="bg-red-200 p-4 rounded-lg mb-6 w-fit text-center">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3">
          Levels
        </h2>
      </div>

      {/* Level Selection Box */}
      <div className="bg-[#F5E8C7] p-8 rounded-lg shadow-lg w-[750px]">
        <h3 className="text-5xl font-bold text-red-600 italic font-dancingScript text-center">
          Choose difficulty
        </h3>

        {/* Difficulty Selection Buttons */}
        <div className="flex flex-col space-y-4 mt-10">
          <button
            className="bg-[#A8D1E7] text-black font-bold text-4xl px-6 py-8 rounded-lg shadow-lg hover:bg-blue-400"
            onClick={() => onLevelSelect("easy")}
          >
            🍌 Sweet & Simple - Easy level
          </button>

          <button
            className="bg-[#A8D1E7] text-black font-bold text-4xl px-6 py-8 rounded-lg shadow-lg hover:bg-blue-600"
            onClick={() => onLevelSelect("medium")}
          >
            🍌 Bana Clever - Medium level
          </button>

          <button
            className="bg-[#FF8888] text-black font-bold text-4xl px-6 py-8 rounded-lg shadow-lg hover:bg-red-600"
            onClick={() => onLevelSelect("hard")}
          >
            🔥 Ultimate Whiz - Hard level
          </button>
        </div>
      </div>
      {/* Bottom Right Image */}
      <img
        src={BottomRightImage}
        alt="Decorative"
        className="absolute bottom-4 right-4 max-w-96 max-h-96 object-contain"
      />
    </div>
  );
}

export default LevelSelectionPage;

// this code by my own knowledge and experience. I have not copied it from any source.