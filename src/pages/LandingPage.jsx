import React from "react";
import LandingPageImg from "../assets/LandingPageBg.png";
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/Landingpageimg1.png";
import bananslices from "../assets/Startingpageimg3.png"

function LandingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative">
      <img
        src={LandingPageImg}
        alt="Starting Page"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="relative z-10 gap-4 flex flex-col">
        <BananaTitleBox />
        <div className="bg-secondary rounded-lg shadow-lg text-center text-black font-dancingScript text-4xl py-3">
          <h3>Redy To Play!</h3>
        </div>
        <div className="flex gap-4 mt-4 justify-center w-full">
          <button className="bg-secondary rounded-lg text-2xl text-center hover:bg-green-600 w-40 h-14 text-black font-dancingScript font-semibold backdrop-blur-sm backdrop-shadow-lg py-3 px-8">
            Login
          </button>
          <button className="bg-secondary rounded-lg text-2xl text-center hover:bg-green-600 w-40 h-14 text-black font-dancingScript font-semibold backdrop-blur-sm backdrop-shadow-lg py-3 px-8">
            Sign Up
          </button>
        </div>
      </div>
      <img
        src={Banana}
        alt="Bottom Right"
        className="absolute bottom-4 right-4 w-96 h-96 object-contain"
      />
      <img
        src={bananslices}
        alt="Bottom Left"
        className="absolute bottom-[-50px] left-20 w-96 h-96 object-contain"
      />
    </div>
  );
}

export default LandingPage;
