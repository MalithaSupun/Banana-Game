import React, { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader"; // Import the Loader component

// Import sound files
import clickSound from "../assets/ClickSound.mp3";
import gameOverSound from "../assets/GameOverSound.mp3";

function GamePage({ selectedLevel }) {
  const levelTimes = {
    easy: 20,
    medium: 15,
    hard: 8,
  };

  const levelLives = {
    easy: 5,
    medium: 3,
    hard: 3,
  };

  const [timeLeft, setTimeLeft] = useState(levelTimes[selectedLevel]);
  const [lives, setLives] = useState(levelLives[selectedLevel]);
  const [imageData, setImageData] = useState(null); // Store question data
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [isCorrect, setIsCorrect] = useState(null); // Track if the answer is correct
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track if image is loaded
  const [hasStarted, setHasStarted] = useState(false); // Track if the game has started

  const firstTimeDown = useRef(false);
  const lifeReduced = useRef(false);

  // Function to play sound
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  // Fetch the first image when the component is mounted
  useEffect(() => {
    if (hasStarted) return; // Prevent multiple fetches if game has already started

    const fetchImage = async () => {
      const response = await fetch("https://marcconrad.com/uob/banana/api.php");
      const data = await response.json();
      setImageData(data);
      setIsImageLoaded(true); // Set image loaded to true when the image is fetched
      setHasStarted(true); // Mark the game as started
    };

    fetchImage(); // Fetch image on mount
  }, [hasStarted]);

  // Function to fetch the image and reset state if needed
  const fetchImage = async () => {
    const response = await fetch("https://marcconrad.com/uob/banana/api.php");
    const data = await response.json();
    setImageData(data);
    setIsImageLoaded(true);
    setHasStarted(true); // Mark the game as started
  };

  // Timer and life logic
  useEffect(() => {
    if (lives === 0 || !isImageLoaded) return; // Don't start timer until image is loaded

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          if (!firstTimeDown.current) {
            firstTimeDown.current = true;
            return 0;
          }

          if (!lifeReduced.current) {
            if (lives > 1) {
              setLives((prevLives) => prevLives - 1);
              lifeReduced.current = true;
              fetchImage(); // Fetch a new question image
              setTimeLeft(levelTimes[selectedLevel]); // Reset timer
            } else {
              setLives(0); // Game Over if no lives left
              lifeReduced.current = true;
              playSound(gameOverSound); // Play the game over sound
            }
          }
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [lives, selectedLevel, isImageLoaded]);

  const handleAnswerSelection = (number) => {
    if (lives === 0 || !imageData) return;

    playSound(clickSound); // Play click sound when an answer is selected

    if (number === imageData.solution) {
      setIsCorrect(true);
      setTimeout(() => {
        fetchImage(); // Fetch a new question image after correct answer
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimeLeft(levelTimes[selectedLevel]); // Reset timer
      }, 1000);
    } else {
      setIsCorrect(false);
      if (lives > 1) {
        setLives(lives - 1); // Deduct life for incorrect answer
      } else {
        setLives(0); // Game Over if no lives left
        playSound(gameOverSound); // Play the game over sound
      }

      setTimeout(() => {
        fetchImage(); // Load new question image even for incorrect answers
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimeLeft(levelTimes[selectedLevel]); // Reset timer
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start h-full w-full bg-gray-300 p-6 overflow-hidden bg-opacity-70 rounded-3xl">
      <div className="bg-red-200 p-4 rounded-lg mb-6 w-fit text-center">
        <h2 className="text-6xl font-bold text-red-600 italic font-dancingScript p-3 capitalize">
          {selectedLevel} level
        </h2>
      </div>

      <div className="bg-fourthcolor p-8 rounded-lg shadow-lg max-w-[850px] min-w-[750px]">
        <div className="flex justify-between mb-6">
          <div className="bg-red-200 px-4 py-2 rounded-lg shadow-md">
            <span className="text-xl font-bold text-black">Lives </span>
            <span className="text-xl">
              {lives > 0 ? "❤️".repeat(lives) : "Game Over"}
            </span>
          </div>
          <div className="bg-red-200 px-4 py-2 rounded-lg shadow-md">
            <span className="text-xl font-bold text-black">Time left: {timeLeft} sec</span>
          </div>
        </div>

        <div className="mb-6">
          {imageData ? (
            <div className="flex justify-center">
              <img src={imageData.question} alt="Question" className="rounded-lg shadow-lg max-w-[500px] min-w-[300px]" />
            </div>
          ) : (
            <Loader /> // Display the loader while the image is being fetched
          )}
        </div>

        <div className="flex justify-around mb-6">
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={i}
              onClick={() => handleAnswerSelection(i)}
              className={`bg-fifthcolor text-white font-bold text-xl px-4 py-2 rounded-lg shadow-lg hover:bg-red-900 ${
                selectedAnswer === i ? (isCorrect ? "bg-green-500" : "bg-red-500") : ""
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        {isCorrect !== null && (
          <div className="text-center">
            {isCorrect ? (
              <span className="text-green-600 font-bold text-xl">Correct!</span>
            ) : (
              <span className="text-red-600 font-bold text-xl">Incorrect! Try again.</span>
            )}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => {
              setLives(levelLives[selectedLevel]); // Reset lives on restart
              setTimeLeft(levelTimes[selectedLevel]);
              fetchImage(); // Fetch new question image
            }}
            className="bg-green-500 text-black font-bold text-2xl px-6 py-3 rounded-lg shadow-lg hover:bg-green-700"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;