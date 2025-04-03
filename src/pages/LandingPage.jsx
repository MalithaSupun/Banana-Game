import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageImg from "../assets/LandingPageBg.png";
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/Landingpageimg1.png";
import bananslices from "../assets/Startingpageimg3.png";
import FallingBanana from "../assets/BananaDrop.png"; // Updated variable name to be more descriptive

function LandingPage() {
  const navigate = useNavigate();
  const [fallingBananas, setFallingBananas] = useState([]);

  // Prevent scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling on unmount
    };
  }, []);

  // Generate falling bananas
  useEffect(() => {
    const bananasArray = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      left: Math.random() * 100, // Random horizontal position
      duration: Math.random() * 12 + 3 + 2, // Different fall speeds
      delay: Math.random() * 2, // Different start delays
      size: Math.random() * 40 + 30 + 20, // Random size
      clicked: false, // New state to track click event
    }));
    setFallingBananas(bananasArray);
  }, []);

  // Handle banana click (pop effect)
  const handleBananaClick = (id) => {
    setFallingBananas((prevBananas) =>
      prevBananas.map((banana) =>
        banana.id === id
          ? { ...banana, clicked: true } // Mark the clicked banana as popped
          : banana
      )
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative overflow-hidden">
      <img
        src={LandingPageImg}
        alt="Starting Page"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="relative z-10 gap-4 flex flex-col">
        <BananaTitleBox />
        <div className="bg-secondary rounded-lg shadow-lg text-center text-black font-dancingScript text-5xl py-5">
          <h3>Ready To Play!</h3>
        </div>
        <div className="flex gap-4 mt-4 justify-center w-full">
          <button
            onClick={() => navigate("/login")}
            className="bg-secondary rounded-lg text-4xl text-center hover:bg-green-600 w-52 h-20 text-black font-dancingScript font-semibold flex items-center justify-center"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-secondary rounded-lg text-4xl text-center hover:bg-green-600 w-52 h-20 text-black font-dancingScript font-semibold flex items-center justify-center"
          >
            Sign Up
          </button>
        </div>
      </div>
      <img
        src={Banana}
        alt="Bottom Right"
        className="absolute bottom-8 right-4 max-w-md max-h-96 object-contain"
      />
      <img
        src={bananslices}
        alt="Bottom Left"
        className="absolute bottom-4 left-20 max-w-2xl max-h-96 object-contain"
      />
      {/* Animated Falling Bananas */}
      {fallingBananas.map((banana) => (
        <img
          key={banana.id}
          src={FallingBanana} // Changed from Flower to FallingBanana
          alt="Falling Banana"
          className={`absolute animate-fall ${banana.clicked ? "pop" : ""}`} // Apply the "pop" animation if clicked
          style={{
            left: `${banana.left}vw`,
            top: `-10vh`,
            width: `${banana.size}px`,
            animationDuration: `${banana.duration}s`,
            animationDelay: `${banana.delay}s`,
            cursor: "pointer", // Make bananas clickable
          }}
          onClick={() => handleBananaClick(banana.id)} // Handle the click event
        />
      ))}
      {/* Falling Banana Animation */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }

          .animate-fall {
            animation: fall linear infinite;
          }

          @keyframes pop {
            0% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
            50% {
              transform: scale(1.2) rotate(10deg);
              opacity: 0.7;
            }
            100% {
              transform: scale(0) rotate(0deg);
              opacity: 0;
            }
          }

          .pop {
            animation: pop 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
}

export default LandingPage;

