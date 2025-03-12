import React, { useEffect, useState } from "react";
import { db } from "../services/firebase"; // Import Firebase Firestore instance
import { collection, getDocs } from "firebase/firestore";
import onestplace from "../assets/1stplace.png";
import secondplace from "../assets/2ndplace.png";
import thirdplace from "../assets/3rdplace.png";

function LeaderBoardPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "scores"));
        let fetchedPlayers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username, // Get username field
          highestScore: doc.data().highestScore, // Get highestScore field
        }));

        // Sort players by highestScore in descending order
        fetchedPlayers.sort((a, b) => b.highestScore - a.highestScore);

        setPlayers(fetchedPlayers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Top 3 players
  const topPlayers = players.slice(0, 3).map((player, index) => ({
    ...player,
    medal: index === 0 ? onestplace : index === 1 ? secondplace : thirdplace,
  }));

  // Remaining players
  const otherPlayers = players.slice(3);

  return (
    <div className="flex flex-col items-start justify-start h-full w-full bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      {/* Header Section */}
      <div className="bg-primary p-4 rounded-lg mb-6 w-fit text-left">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3">
          Leader Board
        </h2>
      </div>

      {/* Leaderboard Main Section */}
      <div className="bg-fourthcolor p-6 rounded-lg shadow-md w-full">
        {/* Top 3 Players */}
        <div className="flex justify-center items-center space-x-14 mb-6">
          {topPlayers.map((player, index) => (
            <div key={player.id} className="flex flex-col items-center p-7 rounded-full">
              <div className={`w-${index === 0 ? "24" : "20"} h-${index === 0 ? "24" : "24"} flex items-center justify-center`}>
                <img src={player.medal} alt={`${player.rank} medal`} className="w-full h-full object-contain" />
              </div>
              <p className="text-lg mt-4 font-bold text-black">{player.username} {player.highestScore}</p>
            </div>
          ))}
        </div>

        {/* Other Leaderboard Players */}
        <div className="p-4 space-y-4 w-full max-h-[500px] overflow-y-auto">
          {otherPlayers.map((player, index) => (
            <div key={player.id} className="flex justify-between items-center bg-gray-300 p-3 rounded-lg shadow-md w-full">
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold">#{index + 4}</span>
                <span className="text-2xl">🧑‍🎓</span>
                <span className="text-xl font-bold">{player.username}</span>
              </div>
              <span className="text-xl font-bold">{player.highestScore.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoardPage;