import input from "./input";
import { sum } from "../utils";

const getSortedInput = (): number[] =>
  input.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));

const findNumber = (
  numbersToSearch: number[],
  numbersFound: number[] = [],
  totalOfNumbersToFind = 2
): number[] => {
  for (let i = 0; i < numbersToSearch.length; i += 1) {
    numbersFound.push(numbersToSearch[i]);

    const total = sum(numbersFound);

    if (numbersFound.length < totalOfNumbersToFind && total >= 2020) {
      numbersToSearch.pop();
      continue;
    }

    if (numbersFound.length === totalOfNumbersToFind) {
      if (total === 2020) {
        break;
      }

      numbersToSearch.pop();
      continue;
    }

    const newNumbersToSearch = numbersToSearch
      .slice(i, numbersToSearch.length)
      .filter((number) => {
        const tempFound = [...numbersFound, number];
        const tempTotal = sum(tempFound);

        if (tempFound.length < totalOfNumbersToFind) {
          return tempTotal < 2020;
        }

        return tempTotal === 2020;
      });

    const currentNumbersFound = findNumber(
      newNumbersToSearch,
      numbersFound,
      totalOfNumbersToFind
    );

    if (currentNumbersFound.length === totalOfNumbersToFind) {
      if (sum(currentNumbersFound) === 2020) {
        break;
      }
    }

    numbersFound.pop();
  }

  return numbersFound;
};

export const findSolution = (totalOfNumbersToFind: number): number[] => {
  const sortedInput: number[] = getSortedInput();
  const numbersFound = findNumber(sortedInput, [], totalOfNumbersToFind);

  return numbersFound;
};
