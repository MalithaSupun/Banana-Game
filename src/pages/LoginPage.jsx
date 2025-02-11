import React from "react";
import LoginBg from "../assets/LoginBg.png"; // Import background image
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/LoginpageRightbanana.png";
import BananaRight from "../assets/LoginPageThribleBanana.png";

function LoginPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }} // Set background
    >
      <BananaTitleBox />
      {/* Top Left Image */}
      <img
        src={BananaRight}
        alt="Top Left"
        className="absolute top-8 left-14 min-w-96 min-h-96 object-contain"
      />
      <div className="flex flex-col items-center bg-fourthcolor p-14 pt-20 rounded-2xl shadow-lg min-w-[500px] min-h-[550px] border mt-9 z-10">
        <label className="text-xl font-bold text-black mb-2 self-start font-dancingScript">
          User Name
        </label>
        <input
          type="text"
          placeholder="Enter your user name"
          className="w-full p-3 rounded-lg bg-thirdcolor text-black placeholder-black text-lg shadow-md font-dancingScript"
        />

        <label className="text-xl font-bold text-black mt-4 mb-2 self-start font-dancingScript">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg bg-thirdcolor text-black placeholder-black text-lg shadow-md font-dancingScript"
        />
        <button className="bg-secondary text-black font-bold text-xl px-6 py-3 rounded-lg mt-12 shadow-lg font-dancingScript">
          Log-In
        </button>

        <p className="mt-4 text-black">
          Already have an account?
          <a href="/signup" className="text-blue-500 ml-1">
            Sign up
          </a>
        </p>
      </div>
      <img
              src={Banana}
              alt="Bottom Right"
              className="absolute bottom-8 right-9 min-w-md min-h-96 object-contain"
            />
    </div>
  );
}

export default LoginPage;
