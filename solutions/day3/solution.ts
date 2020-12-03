import input from "./input";

export const getAmountOfTrees = (): number => {
  let amountOfTrees = 0;
  // starting at the first jump 3 right (j0 + 3 = j3) and one down (i0 + 1 = i1)
  for (let i = 1, j = 3; i < input.length; i += 1) {
    console.log(`i is ${i} j is ${j} und char is ${input[i][j]}`);

    const isTree = input[i][j] === "#";

    if (isTree) {
      amountOfTrees += 1;
    }

    j += 3; // walk three to the right

    if (j >= input[i].length) {
      // as the pattern repeats just got back to the beginning
      j = j - input[1].length;

      continue;
    }
  }

  return amountOfTrees;
};

export const getTotalOfTrees = (): number => {
  return 0;
};
