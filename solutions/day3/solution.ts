import input from "./input";
import { multiply } from "../utils";

interface Slopes {
  right: number;
  down: number;
}

interface InputSlopes extends Slopes {
  input: string[];
}

const isTree = ({ input, right, down }: InputSlopes): boolean =>
  input[down][right] === "#";

const shouldCicle = ({ input, right, down }: InputSlopes): boolean =>
  right >= input[down].length;

const getAmountOfTreesPerSlopes = (slopes: Slopes): number => {
  let amountOfTrees = 0;
  // starting at the first jump
  // slopes.right (j0 + slopes.right) and
  // slopes.down (i0 + slopes.down)
  for (
    let down = slopes.down, right = slopes.right;
    down < input.length;
    down += slopes.down
  ) {
    if (isTree({ input, right, down })) {
      amountOfTrees += 1;
    }

    right += slopes.right; // walk to the right

    if (shouldCicle({ input, right, down })) {
      // as the pattern repeats just go back to the beginning
      right = right - input[1].length;

      continue;
    }
  }

  return amountOfTrees;
};

export const getAmountOfTrees = (): number =>
  getAmountOfTreesPerSlopes({
    right: 3,
    down: 1,
  });

export const getTotalOfTrees = (): number => {
  const slopes: Slopes[] = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  const allTreesFound: number[] = slopes.reduce((allTreesCount, slope) => {
    const totalOfTrees = getAmountOfTreesPerSlopes(slope);

    allTreesCount.push(totalOfTrees);

    return allTreesCount;
  }, [] as number[]);

  return multiply(allTreesFound);
};
