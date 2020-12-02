import {
  getNumberOfValidPasswords,
  getNumberOfValidPasswordsMatchingPositions,
} from "./solution";

export const day2Part1 = (): void => {
  const numberOfValidPasswords = getNumberOfValidPasswords();

  console.log(`--- result part 1: ${numberOfValidPasswords}`);
};

export const day2Part2 = (): void => {
  const numberOfValidPasswords = getNumberOfValidPasswordsMatchingPositions();

  console.log(`--- result part 2: ${numberOfValidPasswords}`);
};
