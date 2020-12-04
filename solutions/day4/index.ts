import {
  getNumberOfValidPassports,
  getNumberOfValidPassportsWithRules,
} from "./solution";

export const day4Part1 = async (): Promise<void> => {
  const numberOfTrees = await getNumberOfValidPassports();

  console.log(`--- result part 1: ${numberOfTrees}`);
};

export const day4Part2 = async (): Promise<void> => {
  const numberOfTrees = await getNumberOfValidPassportsWithRules();

  console.log(`--- result part 1: ${numberOfTrees}`);
};
