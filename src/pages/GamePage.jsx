import React, { useState, useEffect } from "react";

function GamePage({ selectedLevel }) {
  // Define time limits per level
  const levelTimes = {
    easy: 20,
    medium: 15,
    hard: 10,
  };

  // Initialize time based on the selected level
  const [timeLeft, setTimeLeft] = useState(levelTimes[selectedLevel]);

  useEffect(() => {
    // Timer countdown logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 60000); // Decrease time every minute

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="flex flex-col items-start justify-start h-full w-full  bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      {/* Header */}
      <div className="bg-red-200 p-4 rounded-lg mb-6 w-fit text-center">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3 capitalize">
          {selectedLevel} level
        </h2>
      </div>

      {/* Game Container */}
      <div className="bg-[#F5E8C7] p-8 rounded-lg shadow-lg w-[650px]">
        {/* Lives & Time Section */}
        <div className="flex justify-between mb-6">
          <div className="bg-red-200 px-4 py-2 rounded-lg shadow-md">
            <span className="text-xl font-bold text-black">Lives </span>
            <span className="text-xl">❤️❤️❤️</span>
          </div>
          <div className="bg-red-200 px-4 py-2 rounded-lg shadow-md">
            <span className="text-xl font-bold text-black">Time left: {timeLeft} min</span>
          </div>
        </div>

        {/* Restart Button */}
        <div className="flex justify-center">
          <button className="bg-green-500 text-black font-bold text-2xl px-6 py-3 rounded-lg shadow-lg hover:bg-green-700">
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;