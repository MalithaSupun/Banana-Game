import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase authentication

function LogoutButton() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User"); // Default username

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email || "User"); // Get display name, email, or default
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = () => {
    // Show toast notification before logout
    toast.success(`${username} successfully logged out!`, {
      position: "top-center",
      autoClose: 3000,
    });

    // Clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div>
      <button 
        onClick={handleLogout}
        className="bg-secondary text-black font-bold text-2xl py-3 rounded-full w-14 h-14 mt-auto transition-transform duration-150 active:scale-90 hover:bg-green-600 hover:scale-105"
      >
        ⬅️
      </button>
    </div>
  );
}

export default LogoutButton;