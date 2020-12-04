import { resolve } from "path";
import { readFileSync } from "fs";
import { PassportData } from "./types";
import Passport from "./Passport";

const getParsedPassportData = (line: string): PassportData => {
  const data: string[] = line.split("\n").join(" ").split(" ");

  return data.reduce((passportData: PassportData, keyValueString) => {
    const [key, value]: string[] = keyValueString.split(":");

    passportData[key as keyof PassportData] = value;

    return passportData;
  }, {});
};

const getAllPassports = (): Passport[] => {
  const input = readFileSync(resolve(__dirname, "input.txt"), "utf8");
  const passportsData = input.split("\n\n");

  return passportsData.map((passportData) => {
    const parsedPassportData = getParsedPassportData(passportData);
    const passport = new Passport(parsedPassportData);

    return passport;
  });
};

export const getNumberOfValidPassports = (): number => {
  const allPassports = getAllPassports();

  return allPassports.reduce((total, passport) => {
    if (passport.isValid) {
      total += 1;
    }

    return total;
  }, 0);
};

export const getNumberOfValidPassportsWithRules = (): number => {
  const allPassports = getAllPassports();

  return allPassports.reduce((total, passport) => {
    if (passport.isValidStrict) {
      total += 1;
    }

    return total;
  }, 0);
};
