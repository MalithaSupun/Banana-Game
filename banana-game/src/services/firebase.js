import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3rk6nVuhnY8-Rml8wwYLevsWvNfp9jb4",
  authDomain: "banana-game-696d6.firebaseapp.com",
  projectId: "banana-game-696d6",
  storageBucket: "banana-game-696d6.firebasestorage.app",
  messagingSenderId: "117815086039",
  appId: "1:117815086039:web:7135ea7651d2724af05992",
  measurementId: "G-YSLLY2PL79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);