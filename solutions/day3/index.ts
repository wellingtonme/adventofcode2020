import { getAmountOfTrees, getTotalOfTrees } from "./solution";

export const day3Part1 = (): void => {
  const numberOfTrees = getAmountOfTrees();

  console.log(`--- result part 1: ${numberOfTrees}`);
};

export const day3Part2 = (): void => {
  const numberOfTrees = getTotalOfTrees();

  console.log(`--- result part 2: ${numberOfTrees}`);
};
