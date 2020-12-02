import { day1Part1, day1Part2 } from "./day1";
import { day2Part1, day2Part2 } from "./day2";

class Solutions {
  all(): void {
    this.printDay(1, [day1Part1, day1Part2]);
    this.printDay(2, [day2Part1, day2Part2]);
  }

  printDay = (day: number, functions: Function[]): void => {
    console.log(`\n---- day ${day} ----`);

    functions.forEach((fn) => fn());

    console.log("---- End   ----");
  };
}

export default Solutions;
