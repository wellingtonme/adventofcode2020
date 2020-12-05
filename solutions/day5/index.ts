import { getHighestSeatId, getBoardingSeatId } from "./solution";

export const day5Part1 = (): void => {
  const highestSeatId = getHighestSeatId();

  console.log(`--- result part 1: ${highestSeatId}`);
};

export const day5Part2 = (): void => {
  const seatId = getBoardingSeatId();

  console.log(`--- result part 2: ${seatId}`);
};
