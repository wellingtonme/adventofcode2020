import { day1Part1, day1Part2 } from "./day1";
import { day2Part1, day2Part2 } from "./day2";
import { day3Part1, day3Part2 } from "./day3";
import { day4Part1, day4Part2 } from "./day4";
import { day5Part1, day5Part2 } from "./day5";
import { day6Part1, day6Part2 } from "./day6";

class Solutions {
  all(): void {
    this.printDay(1, [day1Part1, day1Part2]);
    this.printDay(2, [day2Part1, day2Part2]);
    this.printDay(3, [day3Part1, day3Part2]);
    this.printDay(4, [day4Part1, day4Part2]);
    this.printDay(5, [day5Part1, day5Part2]);
    this.printDay(6, [day6Part1, day6Part2]);
  }

  printDay(day: number, functions: Function[]): void {
    console.log(`\n---- day ${day} ----`);

    functions.map((fn) => fn());

    console.log("----  End  ----");
  }
}

export default Solutions;
