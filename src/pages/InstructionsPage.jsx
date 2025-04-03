import React from "react";
import BottomRightImage from "../assets/MainMenuBanana.png";

function InstructionPage() {
  return (
    <div className="flex flex-col items-start justify-start h-full w-full bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      {/* Header Section */}
      <div className="bg-primary p-4 rounded-lg mb-6 w-fit text-left">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3">
          Instructions
        </h2>
      </div>

      {/* Instruction Content */}
      <div className="bg-fourthcolor p-6 rounded-lg shadow-md w-fit z-10">
        <h3 className="text-xl font-bold text-red-600 italic mb-4">How to Play:</h3>
        <ul className="text-3xl text-black space-y-2">
          <li>1.) Pick a Level – Easy, Medium, or Hard.</li>
          <li>2.) Solve Math Puzzles – Answer questions to earn points.</li>
          <li>3.) Win & Learn – Score high and become a BanaMath Champion!</li>
        </ul>

        {/* Additional Instructions */}
        <h3 className="text-xl font-bold text-red-600 italic mt-6 mb-4">Tips & Tricks:</h3>
        <ul className="text-3xl text-black space-y-2">
          <li>1.) Stay focused to solve puzzles faster and earn more points!</li>
          <li>2.) Try to complete challenges quickly for bonus time and points.</li>
          <li>3.) Use the hints if you get stuck (limited hints available per level).</li>
          <li>4.) Review the instructions before starting to get the best results.</li>
        </ul>

        {/* Call-to-Action */}
        <p className="text-green-600 font-bold text-2xl mt-6">
          🎯 Tap <span className="text-green-700">'Start'</span> to begin! 🚀
        </p>
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

export default InstructionPage;

// this code by my own knowledge and experience. I have not copied it from any source.