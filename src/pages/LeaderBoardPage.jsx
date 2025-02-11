import React from "react";

function LeaderBoardPage() {
  // Sample leaderboard data
  const topPlayers = [
    { rank: 2, name: "PLAYER", score: 90000, medal: "🥈" },
    { rank: 1, name: "PLAYER", score: 100000, medal: "🥇" },
    { rank: 3, name: "PLAYER", score: 70000, medal: "🥉" },
  ];

  const otherPlayers = [
    { rank: 4, name: "PLAYER", score: 60000 },
    { rank: 5, name: "PLAYER", score: 55000 },
    { rank: 6, name: "PLAYER", score: 52000 },
    { rank: 7, name: "PLAYER", score: 49000 },
  ];

  return (
    <div className="flex flex-col items-start justify-start h-full w-full  bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      {/* Header Section */}
      <div className="bg-primary p-4 rounded-lg mb-6 w-fit text-left">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3">
          Leader board
        </h2>
      </div>

      {/* Leaderboard Main Section */}
      <div className="bg-fourthcolor p-6 rounded-lg shadow-md w-full">
        {/* Top 3 Players */}
        <div className="flex justify-center items-center space-x-14 mb-6">
          {topPlayers.map((player, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center text-5xl">
                {player.medal}
              </div>
              <p className="text-lg font-bold text-black">{player.name} {player.score}</p>
            </div>
          ))}
        </div>

        {/* Other Leaderboard Players */}
        <div className="p-4 space-y-4 w-full">
          {otherPlayers.map((player, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md w-full"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold">#{player.rank}</span>
                <span className="text-2xl">🧑‍🎓</span>
                <span className="text-xl font-bold">{player.name}</span>
              </div>
              <span className="text-xl font-bold">{player.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoardPage;