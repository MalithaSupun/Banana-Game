import React from "react";
import BottomRightImage from "../assets/MainMenuBanana.png";

function WelcomePage() {
  return (
    <div className="flex flex-col items-start justify-start h-full w-full  bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      {/* Header Section */}
      <div className="bg-red-200 p-4 rounded-lg mb-6 w-fit text-center">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3">
          BanaMath
        </h2>
      </div>

      {/* Welcome Box */}
      <div className="bg-[#F5E8C7] p-8 rounded-lg shadow-lg max-w-[800px] z-10">
        <h3 className="text-6xl font-bold text-red-600 italic font-dancingScript">
          🍌 Welcome to BanaMath! 🍌
        </h3>

        {/* Description */}
        <div className="mt-6 w-[700px]">
          <p className="text-4xl text-black mt-4 text-center leading-relaxed">
            Join a fun math adventure where numbers meet juicy bananas! Solve
            puzzles, earn bana points, and make learning sweet! 🎯
          </p>
        </div>
        {/* Play Now Button */}
        <div className="flex mt-6">
          <button className="bg-green-500 text-black font-bold text-4xl px-10 py-7 rounded-lg shadow-lg hover:bg-green-700">
            Play Now
          </button>
        </div>
      </div>
      {/* Bottom Right Image */}
      <img
        src={BottomRightImage}
        alt="Decorative"
        className="absolute bottom-4 right-2 max-w-xl max-h-xl object-contain"
      />
    </div>
  );
}

export default WelcomePage;
