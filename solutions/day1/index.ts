import { findSolution } from "./solution";
import { multiply } from "../utils";

export const day1Part1 = (): void => {
  const numbers = findSolution(2);

  console.log(`--- result part 1: ${multiply(numbers)}`);
};

export const day1Part2 = (): void => {
  const numbers = findSolution(3);

  console.log(`--- result part 2: ${multiply(numbers)}`);
};
