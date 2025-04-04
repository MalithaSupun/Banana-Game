import React, { useState } from "react";
import LoginBg from "../assets/LoginBg.png";
import BananaTitleBox from "../components/BananaTitleBox";
import Banana from "../assets/LoginpageRightbanana.png";
import BananaRight from "../assets/LoginPageThribleBanana.png";
import { useNavigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
import { auth } from "../services/firebase"; 
import { toast } from "react-toastify"; // Import toast
import GoogleLogo from "../assets/Googlelogo.png";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // Password validation: minimum 6 characters, maximum 12 characters, must include a special character, number, and uppercase letter
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#])[A-Za-z0-9@#]{6,12}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be between 6 and 12 characters and include at least one uppercase letter, one number, and one special character (@ or #).", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the user's profile with the username
        updateProfile(user, {
          displayName: username, // Set the displayName to the entered username
        }).then(() => {
          // Successfully updated user profile
          toast.success(`${username} successfully signed up!`, { // Show toast message
            position: "top-center",
            autoClose: 3000, // Auto close after 3 seconds
          });
          navigate("/login"); // Navigate to login page after successful sign-up
        }).catch((error) => {
          const errorMessage = error.message;
          alert(`Error updating profile: ${errorMessage}`);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("email already in use")) {
          toast.error("This email is already registered.", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      });
  };

  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        
        // Update the user's profile with the username
        updateProfile(user, {
          displayName: user.displayName, // Set the displayName to the user's name from Google
        }).then(() => {
          // Successfully updated user profile
          toast.success(`${user.displayName} successfully signed up with Google!`, { // Show toast message
            position: "top-center",
            autoClose: 3000, // Auto close after 3 seconds
          });
          navigate("/login"); // Navigate to login page after successful sign-up
        }).catch((error) => {
          const errorMessage = error.message;
          alert(`Error updating profile: ${errorMessage}`);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page directly
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
      <div className="flex flex-col items-center bg-[#F5E8C7] p-14 rounded-lg shadow-lg min-w-[500px] min-h-[600px] mt-10 z-10">
        <label className="text-xl font-bold text-[#4E2500] mb-2 self-start font-dancingScript">
          User Name
        </label>
        <input
          type="text"
          placeholder="Enter your user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />
        <label className="text-xl font-bold text-[#4E2500] mt-4 mb-2 self-start font-dancingScript">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />
        <label className="text-xl font-bold text-[#4E2500] mt-4 mb-2 self-start font-dancingScript">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />
        <label className="text-xl font-bold text-[#4E2500] mt-4 mb-2 self-start font-dancingScript">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#A8E890] text-[#4E2500] placeholder-[#4E2500] text-lg shadow-md font-dancingScript"
        />
        <button
          onClick={handleSignUp}
          className="bg-[#77C15E] text-[#4E2500] font-bold text-xl px-6 py-3 rounded-lg mt-6 shadow-lg font-dancingScript"
        >
          Sign-Up
        </button>
        <button
          onClick={handleGoogleSignUp}
          className="bg-white text-white font-bold text-xl px-6 py-3 rounded-lg mt-6 shadow-lg flex items-center justify-center gap-4 font-dancingScript"
        >
          {/* Google Logo */}
          <img 
            src={GoogleLogo}
            alt="Google Logo" 
            className="w-6 h-6" 
          />
        </button>
        <p className="mt-4 text-black">
          Already have an account?
          <a onClick={handleLoginClick} className="text-blue-500 ml-1">
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

// i coded this my knowledge and experience. some error fixed using copilot and get referce and error search from google and get answer from stackoverflow