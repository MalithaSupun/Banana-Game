import React from "react";
import startingPageImg from "../assets/background_img.png";

export default function StartingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <img src={startingPageImg} alt="Starting Page" className="w-full h-full object-cover" />

    </div>
  );
}