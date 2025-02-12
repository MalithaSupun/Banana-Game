import React from "react";
import { useNavigate } from "react-router-dom";
import LandingPageImg from "../assets/LandingPageBg.png";
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/Landingpageimg1.png";
import bananslices from "../assets/Startingpageimg3.png";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative">
      <img
        src={LandingPageImg}
        alt="Starting Page"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="relative z-10 gap-4 flex flex-col">
        <BananaTitleBox />
        <div className="bg-secondary rounded-lg shadow-lg text-center text-black font-dancingScript text-5xl py-5">
          <h3>Redy To Play!</h3>
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
    </div>
  );
}

export default LandingPage;
