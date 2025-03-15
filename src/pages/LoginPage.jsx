import React, { useState, useEffect } from "react";
import LoginBg from "../assets/LoginBg.png";
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/LoginpageRightbanana.png";
import BananaRight from "../assets/LoginPageThribleBanana.png";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify"; // Import toast
import GoogleLogo from "../assets/GoogleLogo.png";

function LoginPage() {
  const [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("savedEmail", email);
  }, [email]);

  const handleLogin = () => {
    if (!email) {
      toast.error("Please enter your email.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.", {
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

    if (!password) {
      toast.error("Please enter your password.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store the signed-in email in localStorage
        localStorage.setItem("savedEmail", user.email);

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

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // Store the signed-in email in localStorage
        localStorage.setItem("savedEmail", user.email);

        // Get the authentication token
        user.getIdToken().then((token) => {
          localStorage.setItem("authToken", token); // Store the token in local storage
          localStorage.setItem("userEmail", user.email); // Optionally store email
          localStorage.setItem("username", user.displayName); // Store the username

          toast.success("Successfully logged in with Google!", {
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
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-white font-bold text-xl px-6 py-3 rounded-lg mt-6 shadow-lg flex items-center justify-center font-dancingScript"
        >
          {/* Google Logo */}
          <img src={GoogleLogo} alt="Google Logo" className="w-8 h-8" />
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
