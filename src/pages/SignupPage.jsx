import React from "react";
import LoginBg from "../assets/LoginBg.png";
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/LoginpageRightbanana.png";
import BananaRight from "../assets/LoginPageThribleBanana.png";

function SignupPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
    <BananaTitleBox />
          {/* Top Left Image */}
          <img
            src={BananaRight}
            alt="Top Left"
            className="absolute top-8 left-14 min-w-96 min-h-96 object-contain"
          />
      <div className="flex flex-col items-center bg-[#F5E8C7] p-14 rounded-lg shadow-lg min-w-[500px] min-h-[600px] mt-10 z-10">
        <label className="text-xl font-bold text-[#4E2500] mb-2 self-start font-dancingScript">
          User Name
        </label>
        <input
          type="text"
          placeholder="Enter your user name"
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />

        <label className="text-xl font-bold text-[#4E2500] mt-4 mb-2 self-start font-dancingScript">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />

        <label className="text-xl font-bold text-[#4E2500] mt-4 mb-2 self-start font-dancingScript">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />

        <label className="text-xl font-bold text-[#4E2500] mt-4 mb-2 self-start font-dancingScript">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Enter your confirm password"
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />

        <button className="bg-[#77C15E] text-[#4E2500] font-bold text-xl px-6 py-3 rounded-lg mt-6 shadow-lg font-dancingScript">
          Sign-Up
        </button>

        <p className="mt-4 text-black">
          Already have an account?
          <a href="/login" className="text-blue-500 ml-1">
            Log In
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

export default SignupPage;