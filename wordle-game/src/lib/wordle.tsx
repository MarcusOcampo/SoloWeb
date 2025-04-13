export const words: string[] = ["apple", "peach", "grape", "mango", "lemon", "berry"]; // sample words
export const maxTries: number = 6;

export function generateRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

export type GuessResult = "correct" | "present" | "absent";

export function checkGuess(word: string, guess: string): GuessResult[] {
  const result: GuessResult[] = [];

  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      result.push("correct");
    } else if (word.includes(guess[i])) {
      result.push("present");
    } else {
      result.push("absent");
    }
  }

  return result;
}