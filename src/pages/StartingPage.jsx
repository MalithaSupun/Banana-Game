import React from "react";
import startingPageImg from "../assets/background_img.png";
import BananaTitleBox from '../components/BananaTitleBox';
import MathFunStartBox from "../components/MathFunStartBox";
import Loading from "../components/Loading";
import banana from "../assets/Startingpageimg2.png";
import bananslices from "../assets/Startingpageimg3.png"

export default function StartingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative">
      <img src={startingPageImg} alt="Starting Page" className="w-full h-full object-cover absolute top-0 left-0" />
      <div className="relative z-10 gap-4 flex flex-col">
        <BananaTitleBox />
        <MathFunStartBox />
        <Loading />
      </div>
      {/* Image positioned at the bottom-right */}
      <img 
        src={banana} 
        alt="Bottom Right Image" 
        className="absolute bottom-0 right-0 max-w-96 max-h-96 object-cover mb-4 mr-4" 
      />
      <img 
        src={bananslices} 
        alt="Bottom Right Image" 
        className="absolute bottom-0 left-0 max-w-96 max-h-96 object-cover mb-20 mr-20" 
      />
    </div>
  );
}