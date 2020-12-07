import { resolve } from "path";
import { readFileSync } from "fs";
import { sum } from "../utils";

const getInput = (): string =>
  readFileSync(resolve(__dirname, "input.txt"), "utf8");

const countGroupYesAnswer = (groupAnswers: string): number => {
  const peopleAnswer = groupAnswers.split("\n");
  const uniqAnswers = peopleAnswer.reduce<Array<string>>((answers, answer) => {
    const yesAnswers = answer.split("");

    return Array.from(new Set([...answers, ...yesAnswers]));
  }, []);

  return uniqAnswers.length;
};

const countAnswers = (): number[] => {
  const input = getInput().split("\n\n");
  const answers = input.map(countGroupYesAnswer);

  return answers;
};

export const countTotalAmountOfYesQuestionPerGroup = (): number => {
  const numberOfAnswers = sum(countAnswers());

  return numberOfAnswers;
};

// part 2
const pick = (item: Record<any, any>, keys: string[]): Object =>
  keys.length
    ? keys.reduce<Record<any, any>>((finalItem, key) => {
        if (item.hasOwnProperty(key)) {
          finalItem[key] = item[key];
        }

        return finalItem;
      }, {})
    : {};

const countGroupEveryYesAnswer = (groupAnswers: string): number => {
  type AnswersCheck = {
    initial: boolean;
    answers: Record<any, any>;
  };
  const peopleAnswer = groupAnswers.split("\n");
  const answers = peopleAnswer.reduce<AnswersCheck>(
    (result, answer) => {
      const yesAnswers = answer.split("");

      if (result.initial) {
        yesAnswers.forEach((answer) => {
          result.answers[answer] = true;
        });

        return { initial: false, answers: result.answers };
      }

      return { initial: false, answers: pick(result.answers, yesAnswers) };
    },
    { initial: true, answers: {} }
  ).answers;

  return Object.keys(answers).length;
};

const countAnswersInGroup = (): number[] => {
  const input = getInput().split("\n\n").filter(Boolean);
  const answers = input.map(countGroupEveryYesAnswer);

  return answers;
};

export const countTotalAmountOfYesQuestionOnAllGroup = (): number => {
  const numberOfAnswers = sum(countAnswersInGroup());

  return numberOfAnswers;
};
