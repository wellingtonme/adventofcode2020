import { PassportData } from "./types";

export default class Passport {
  passport: PassportData;
  private requiredProps: string[];

  constructor(passport: PassportData) {
    this.passport = passport;
    this.requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  }

  get isValid(): boolean {
    const passportProperties = Object.keys(this.passport);

    const isValid = this.requiredProps.every((requiredProp) =>
      passportProperties.includes(requiredProp)
    );

    return isValid;
  }

  get isValidStrict(): boolean {
    if (!this.isValid) {
      return false;
    }

    return this.isAllRulesValid();
  }

  private isAllRulesValid(): boolean {
    return [
      this.isValidBirthYear(),
      this.isValidIssueYear(),
      this.isValidExpirationYear(),
      this.isValidHeight(),
      this.isValidHairColor(),
      this.isValidEyeColor(),
      this.isValidPassportId(),
    ].every((isValid) => isValid);
  }

  private getAsNumber(prop?: string): number | typeof NaN {
    return Number.parseInt(prop || "", 10);
  }

  private isValidRange(
    minRange: number,
    maxRange: number,
    prop?: string
  ): boolean {
    const value = this.getAsNumber(prop);

    return value >= minRange && value <= maxRange;
  }

  private isValidBirthYear() {
    return this.isValidRange(1920, 2002, this.passport.byr);
  }

  private isValidIssueYear() {
    return this.isValidRange(2010, 2020, this.passport.iyr);
  }

  private isValidExpirationYear() {
    return this.isValidRange(2020, 2030, this.passport.eyr);
  }

  private isValidHeight(): boolean {
    const matches = (this.passport.hgt || "").match(/(\d+)([A-z]+)/);

    if (!matches) {
      return false;
    }

    const [, value, unit] = matches;
    if (unit === "cm") {
      return this.isValidRange(150, 193, value);
    }

    if (unit === "in") {
      return this.isValidRange(59, 76, value);
    }

    return false;
  }

  private isValidHairColor(): boolean {
    return /#[0-9a-f]{6}/.test(this.passport.hcl || "");
  }

  private isValidEyeColor(): boolean {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
      this.passport.ecl || ""
    );
  }

  private isValidPassportId(): boolean {
    return /^[0-9]{9}$/.test(this.passport.pid || "");
  }
}
