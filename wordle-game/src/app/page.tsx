"use client";  // client-side component

import { useState } from "react";
import { generateRandomWord, checkGuess, maxTries, GuessResult } from "../lib/wordle";
import Head from "next/head";  // import the Head component

export default function Home() {
  const [word, setWord] = useState<string>(generateRandomWord());
  const [guesses, setGuesses] = useState<{ guess: string; result: GuessResult[] }[]>(Array(maxTries).fill(null));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [currentTry, setCurrentTry] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<string | null>(null);

  const handleGuess = () => {
    if (currentGuess.length !== 5 || currentTry >= maxTries || gameStatus) return; // check if the game is already over

    const result = checkGuess(word, currentGuess.toUpperCase());
    const updatedGuesses = [...guesses];
    updatedGuesses[currentTry] = { guess: currentGuess.toUpperCase(), result };

    setGuesses(updatedGuesses);
    setCurrentTry(currentTry + 1);
    setCurrentGuess("");

    if (result.every((r) => r === "correct")) {
      setGameStatus("You Win!");
    } else if (currentTry + 1 === maxTries) {
      setGameStatus(`Game Over! The word was ${word}`);
    }
  };

  const handleReplay = () => {
    setWord(generateRandomWord());
    setGuesses(Array(maxTries).fill(null));
    setCurrentGuess("");
    setCurrentTry(0);
    setGameStatus(null);
  };

  return (
    <>
      <Head>
        <title>Wordle Game</title>  
      </Head>

      <div className="h-screen flex flex-col items-center justify-center bg-black">
        <h1 className="text-4xl font-bold text-white mb-8">Wordle Game</h1>
        <div className="mb-8">
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            maxLength={5}
            className="text-center text-2xl w-24 p-2 border border-gray-300 rounded"
            disabled={gameStatus !== null} // disable the input if the game is over
          />
          <button
            onClick={handleGuess}
            className="ml-4 p-2 bg-blue-500 text-white rounded"
            disabled={gameStatus !== null} // disable the button if the game is over
          >
            Guess
          </button>
        </div>
        <div className="space-y-2">
          {guesses.map((guessRow, index) =>
            guessRow ? (
              <div key={index} className="flex justify-center space-x-2">
                {guessRow.guess.split("").map((letter, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 flex items-center justify-center rounded ${guessRow.result[i] === "correct"
                      ? "bg-green-500"
                      : guessRow.result[i] === "present"
                      ? "bg-yellow-500"
                      : "bg-gray-300"}`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ) : (
              <div key={index} className="flex justify-center space-x-2">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <div key={i} className="w-12 h-12 border border-gray-300"></div>
                  ))}
              </div>
            )
          )}
        </div>
        {gameStatus && (
          <div className="mt-8 text-xl font-bold text-center text-white">{gameStatus}</div>
        )}
        <button
          onClick={handleReplay}
          className="mt-4 p-2 bg-gray-600 text-white rounded"
        >
          Replay
        </button>
      </div>
    </>
  );
}
