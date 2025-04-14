export const words: string[] = ["apple", "peach", "grape", "mango", "lemon", "berry", "jolly"]; // sample words
export const maxTries: number = 6;

export function generateRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

export type GuessResult = "correct" | "present" | "absent";

export function checkGuess(word: string, guess: string): GuessResult[] {
  const result: GuessResult[] = new Array(word.length).fill("absent"); // initialize all as absent for now
  const wordLetters = word.toUpperCase().split(""); // take note of word the must be guessed
  const guessLetters = guess.toUpperCase().split(""); 

  for(let i=0; i<wordLetters.length; i++){
    if (guessLetters[i] === wordLetters[i]){
      result[i] = "correct";
      // remove letter that is already found as correct so no double checking
      wordLetters[i] = "";
      guessLetters[i] = "";
    }
  }

  for (let i=0; i< guessLetters.length; i++){
    if (guessLetters[i] && wordLetters.includes(guessLetters[i])){
      result[i] = "present";
      const index= wordLetters.indexOf(guessLetters[i]);
      wordLetters[index] = ""; // only mark first letter found as present (so for example only one p exists if 2 ps from guess word only one p is present)
    }
  }

  return result;
}