import {
  getNumberOfValidPassports,
  getNumberOfValidPassportsWithRules,
} from "./solution";

export const day4Part1 = (): void => {
  const numberOfTrees = getNumberOfValidPassports();

  console.log(`--- result part 1: ${numberOfTrees}`);
};

export const day4Part2 = (): void => {
  const numberOfTrees = getNumberOfValidPassportsWithRules();

  console.log(`--- result part 2: ${numberOfTrees}`);
};
