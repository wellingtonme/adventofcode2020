import input from "./input";

interface ParsedLine {
  requiredLetter: string;
  firstNumber: number;
  secondNumber: number;
  password: string;
}

const parseNumbers = (
  amounts: string
): { firstNumber: number; secondNumber: number } => {
  const [min, max] = amounts.split("-");

  return { firstNumber: parseInt(min, 10), secondNumber: parseInt(max, 10) };
};

const parseLine = (line: string): ParsedLine => {
  const [amounts, letter, password] = line.split(" ");
  const { firstNumber, secondNumber } = parseNumbers(amounts);

  return {
    requiredLetter: letter.replace(":", ""),
    firstNumber,
    secondNumber,
    password,
  };
};

// this is for part 1
const isWithinRange = (
  numberOfMatchs: number,
  parsedLine: ParsedLine
): boolean =>
  numberOfMatchs >= parsedLine.firstNumber &&
  numberOfMatchs <= parsedLine.secondNumber;

const isValidPassword = (parsedLine: ParsedLine): boolean => {
  const regx = new RegExp(parsedLine.requiredLetter, "gm");

  const numberOfMatchs = (parsedLine.password.match(regx) || []).length;

  return isWithinRange(numberOfMatchs, parsedLine);
};

// solution for part 1
export const getNumberOfValidPasswords = (): number =>
  input.reduce((totalOfValidPasswords, line) => {
    try {
      const parsedLine = parseLine(line);

      if (isValidPassword(parsedLine)) {
        totalOfValidPasswords += 1;
      }

      return totalOfValidPasswords;
    } catch (error) {
      return totalOfValidPasswords;
    }
  }, 0);

const isValidPasswordMatchingPositions = (line: ParsedLine): boolean => {
  const splitedPassword = line.password.split("");
  // -1 because the numbers are 1 index based not 0 index based
  const firstLetter = splitedPassword[line.firstNumber - 1];
  const secondLetter = splitedPassword[line.secondNumber - 1];

  // checks
  const isBothMatching =
    firstLetter === secondLetter && firstLetter === line.requiredLetter;

  if (isBothMatching) {
    return false;
  }

  const isFirstLetterValid = firstLetter === line.requiredLetter;
  const isSecondLetterValid = secondLetter === line.requiredLetter;

  // at this point we are sure that both are not equal and matching
  // if they are both equal both here will be false due first check
  // if one of them is valid this is a valid password otherwise it is false
  const isValid = isFirstLetterValid || isSecondLetterValid;

  return isValid;
};

// solution for part 2
export const getNumberOfValidPasswordsMatchingPositions = (): number =>
  input.reduce((totalOfValidPasswords, line) => {
    try {
      const parsedLine = parseLine(line);

      if (isValidPasswordMatchingPositions(parsedLine)) {
        totalOfValidPasswords += 1;
      }

      return totalOfValidPasswords;
    } catch (error) {
      return totalOfValidPasswords;
    }
  }, 0);
