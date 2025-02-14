import React, { useState } from "react";
import LoginBg from "../assets/LoginBg.png";
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/LoginpageRightbanana.png";
import BananaRight from "../assets/LoginPageThribleBanana.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { toast } from "react-toastify"; // Import toast

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Get the authentication token
        user.getIdToken().then((token) => {
          localStorage.setItem("authToken", token); // Store the token in local storage
          localStorage.setItem("userEmail", user.email); // Optionally store email
  
          toast.success("Successfully logged in!", { 
            position: "top-center",
            autoClose: 3000,
          });
  
          navigate("/mainmenu"); // Redirect to the main menu
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <BananaTitleBox />
      <img
        src={BananaRight}
        alt="Top Left"
        className="absolute top-8 left-14 min-w-96 min-h-96 object-contain"
      />
      <div className="flex flex-col items-center bg-fourthcolor p-14 pt-20 rounded-2xl shadow-lg min-w-[500px] min-h-[550px] border mt-9 z-10">
        <label className="text-xl font-bold text-black mb-2 self-start font-dancingScript">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-thirdcolor text-black placeholder-black text-lg shadow-md font-dancingScript"
        />
        <label className="text-xl font-bold text-black mt-4 mb-2 self-start font-dancingScript">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-thirdcolor text-black placeholder-black text-lg shadow-md font-dancingScript"
        />
        <button
          onClick={handleLogin}
          className="bg-secondary text-black font-bold text-xl px-6 py-3 rounded-lg mt-12 shadow-lg font-dancingScript"
        >
          Log-In
        </button>
        <p className="mt-4 text-black">
          Don't have an account?
          <a href="/signup" className="text-blue-500 ml-1">
            Sign Up
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