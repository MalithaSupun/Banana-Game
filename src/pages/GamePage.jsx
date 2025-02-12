import React, { useState, useEffect } from "react";

function GamePage({ selectedLevel = "medium" }) {
  // Define time limits based on difficulty level
  const levelTimes = {
    easy: 20, // 20 minutes
    medium: 15, // 15 minutes
    hard: 10, // 10 minutes
  };

  // Set initial time based on selected level
  const [timeLeft, setTimeLeft] = useState(levelTimes[selectedLevel]);

  useEffect(() => {
    // Timer countdown logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 60000); // Decrease time every minute

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-300 p-6">
      {/* Header Section */}
      <div className="bg-red-200 p-4 rounded-lg mb-6 w-fit text-center">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3 capitalize">
          {selectedLevel} level
        </h2>
      </div>

      {/* Game Container */}
      <div className="bg-[#F5E8C7] p-8 rounded-lg shadow-lg w-[650px]">
        {/* Lives & Time Section */}
        <div className="flex justify-between mb-6">
          {/* Lives */}
          <div className="bg-red-200 px-4 py-2 rounded-lg shadow-md">
            <span className="text-xl font-bold text-black">Lives </span>
            <span className="text-xl">❤️❤️❤️</span>
          </div>

          {/* Time Left */}
          <div className="bg-red-200 px-4 py-2 rounded-lg shadow-md">
            <span className="text-xl font-bold text-black">Time left: </span>
            <span className="text-xl">{timeLeft} min</span>
          </div>
        </div>

        {/* Number Selection Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {[...Array(10).keys()].map((num) => (
            <button
              key={num}
              className="bg-red-500 text-white font-bold text-2xl w-12 h-12 rounded-full shadow-md hover:bg-red-700"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Restart Button */}
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-black font-bold text-2xl px-6 py-3 rounded-lg shadow-lg hover:bg-green-700"
            onClick={() => setTimeLeft(levelTimes[selectedLevel])} // Restart Timer
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;