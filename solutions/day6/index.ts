import {
  countTotalAmountOfYesQuestionPerGroup,
  countTotalAmountOfYesQuestionOnAllGroup,
} from "./solution";

export const day6Part1 = (): void => {
  const numberOfYesQuestions = countTotalAmountOfYesQuestionPerGroup();

  console.log(`--- result part 1: ${numberOfYesQuestions}`);
};

export const day6Part2 = (): void => {
  const numberOfYesQuestions = countTotalAmountOfYesQuestionOnAllGroup();

  console.log(`--- result part 2: ${numberOfYesQuestions}`);
};
