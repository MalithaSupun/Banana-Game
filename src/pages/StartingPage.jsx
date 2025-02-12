import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import startingPageImg from "../assets/background_img.png";
import BananaTitleBox from "../components/BananaTitleBox";
import MathFunStartBox from "../components/MathFunStartBox";
import Loading from "../components/Loading";
import banana from "../assets/Startingpageimg2.png";
import bananslices from "../assets/Startingpageimg3.png";
import Flower from "../assets/Flower.png"; // Import your new image

export default function StartingPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/landing");
    }, 4000); // 4 seconds timeout

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative">
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
        src={banana}
        alt="Bottom Right Image"
        className="absolute bottom-0 right-0 max-w-96 max-h-96 object-cover mb-4 mr-4"
      />

      <img
        src={bananslices}
        alt="Bottom Left Image"
        className="absolute bottom-0 left-20 max-w-2xl max-h-96 object-cover mb-20 mr-20"
      />
    </div>
  );
}
