import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import startingPageImg from "../assets/background_img.png";
import MathFunStartBox from "../components/MathFunStartBox";
import Loading from "../components/Loading";
import banana from "../assets/Startingpageimg2.png";
import bananslices from "../assets/Startingpageimg3.png";
import Flower from "../assets/Flower.png"; 
export default function StartingPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [fallingFlowers, setFallingFlowers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/landing");
    }, 4000); // 4 seconds timeout

    return () => clearTimeout(timer);
  }, [navigate]);

  // Generate falling flowers
  useEffect(() => {
    const flowersArray = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      left: Math.random() * 100, // Random horizontal position
      duration: Math.random() * 5 + 3, // Different fall speeds
      delay: Math.random() * 2, // Different start delays
      size: Math.random() * 30 + 20, // Random size
    }));
    setFallingFlowers(flowersArray);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative overflow-hidden">
      <img
        src={startingPageImg}
        alt="Starting Page"
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="relative z-10 gap-4 flex flex-col items-center">
      <div className="bg-primary p-4 rounded-lg text-center shadow-lg text-red-600 font-dancingScript text-6xl px-10 py-5 relative">
          <h5>Banana Math</h5>

          <img
            src={Flower}
            alt="Top Right Image"
            className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 max-w-16 max-h-16 object-contain"
          />
        </div>

        <MathFunStartBox />

        <div className="w-auto">
          <Loading />
        </div>
      </div>
      <img
        src={Flower} // Your image here
        alt="Top Right"
        className="absolute top-8 right-8 max-w-32 max-h-32 object-contain"
      />


      {/* Bottom Right Image */}
      <img
        src={banana}
        alt="Bottom Right Image"
        className="absolute bottom-0 right-0 max-w-96 max-h-96 object-cover mb-4 mr-4"
      />

      <img
        src={bananslices}
        alt="Bottom Left Image"
        className="absolute bottom-0 left-20 max-w-2xl max-h-96 object-cover mb-20 mr-20"
      />
  {/* Animated Falling Flowers */}
  {fallingFlowers.map((flower) => (
        <img
          key={flower.id}
          src={Flower}
          alt="Falling Flower"
          className="absolute animate-fall"
          style={{
            left: `${flower.left}vw`,
            top: `-10vh`,
            width: `${flower.size}px`,
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`,
          }}
        />
      ))}
      {/* Snowfall Effect */}
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
        `}
      </style>
    </div>
  );
}