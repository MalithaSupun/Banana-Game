import React from "react";
import startingPageImg from "../assets/background_img.png";

export default function StartingPage() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      {/* Background Image */}
      <img src={startingPageImg} alt="Starting Page" className="w-full h-full object-cover absolute top-0 left-0" />
      
      {/* Container for Text */}
      <div className="absolute text-center">
        <h1 className="text-5xl font-bold text-white bg-pink-400 px-6 py-2 rounded-lg">
          Banana Maths
        </h1>
      </div>
    </div>
  );
}