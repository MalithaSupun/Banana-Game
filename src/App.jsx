import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartingPage from "./pages/StartingPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainMenuPage from "./pages/MainMenuPage";
import InstructionsPage from "./pages/InstructionsPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import WelcomePage from "./pages/WelcomePage";
import LevelSelectionPage from "./pages/LevelSelectionPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mainmenu" element={<MainMenuPage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/levelselection" element={<LevelSelectionPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;