import { HashRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import StartingPage from "./pages/StartingPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainMenuPage from "./pages/MainMenuPage";
import BananaNews from "./pages/BananaNews";
import InstructionsPage from "./pages/InstructionsPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import WelcomePage from "./pages/WelcomePage";
import LevelSelectionPage from "./pages/LevelSelectionPage";
import GamePage from "./pages/GamePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./routes/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private Routes */}
        <Route 
          path="/mainmenu" 
          element={
            <PrivateRoute>
              <MainMenuPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/instructions" 
          element={
            <PrivateRoute>
              <InstructionsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <PrivateRoute>
              <LeaderBoardPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/welcome" 
          element={
            <PrivateRoute>
              <WelcomePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/levelselection" 
          element={
            <PrivateRoute>
              <LevelSelectionPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/game" 
          element={
            <PrivateRoute>
              <GamePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/banananews" 
          element={
            <PrivateRoute>
              <BananaNews />
            </PrivateRoute>
          } 
        />
      </Routes>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;


// this code by my own knowledge and experience. I have not copied it from any source.
//https://tailwindcss.com/docs/installation/using-vite this url have project creation guidence
