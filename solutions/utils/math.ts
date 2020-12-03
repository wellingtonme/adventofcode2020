export const multiply = (numbers: number[]): number =>
  numbers.reduce((total, number) => {
    if (total === null) {
      return number;
    }

    total *= number;

    return total;
  });

export const sum = (numbers: number[]): number =>
  numbers.reduce((total, number) => {
    total += number;

    return total;
  }, 0);
