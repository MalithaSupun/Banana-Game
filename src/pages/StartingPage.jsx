import React from "react";
import startingPageImg from "../assets/background_img.png";
import BananaTitleBox from '../components/BananaTitleBox';
import MathFunStartBox from "../components/MathFunStartBox";
import Loading from "../components/Loading";

export default function StartingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative">
      <img src={startingPageImg} alt="Starting Page" className="w-full h-full object-cover absolute top-0 left-0" />
      <div className="relative z-10 gap-4 flex flex-col">
        <BananaTitleBox />
        <MathFunStartBox />
        <Loading />
      </div>
    </div>
  );
}