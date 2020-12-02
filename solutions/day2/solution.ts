import input from "./input";

interface ParsedLine {
  requiredLetter: string;
  minAmount: number;
  maxAmount: number;
  password: string;
}

const parseAmount = (
  amounts: string
): { minAmount: number; maxAmount: number } => {
  const [min, max] = amounts.split("-");

  return { minAmount: parseInt(min, 10), maxAmount: parseInt(max, 10) };
};

const parseLine = (line: string): ParsedLine => {
  const [amounts, letter, password] = line.split(" ");
  const { minAmount, maxAmount } = parseAmount(amounts);

  return {
    requiredLetter: letter.replace(":", ""),
    minAmount,
    maxAmount,
    password,
  };
};

const isWithinRange = (
  numberOfMatchs: number,
  parsedLine: ParsedLine
): boolean =>
  numberOfMatchs >= parsedLine.minAmount &&
  numberOfMatchs <= parsedLine.maxAmount;

const isValidPassword = (parsedLine: ParsedLine): boolean => {
  const regx = new RegExp(parsedLine.requiredLetter, "gm");

  const numberOfMatchs = (parsedLine.password.match(regx) || []).length;

  return isWithinRange(numberOfMatchs, parsedLine);
};

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
