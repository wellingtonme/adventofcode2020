import input from "./input";
import { SeatInfo, RangeType, MinMaxType } from "./types";

const getColumnMapFromCode = (code: string): string[] => {
  const columnMap = code.substr(7, 3);

  return columnMap.split("");
};

const getRowMapFromCode = (code: string): string[] => {
  const rowMap = code.substr(0, 7);

  return rowMap.split("");
};

const isUpperCoordinate = (coordinate: string): boolean =>
  coordinate === "F" || coordinate === "L";

const findEntryPerMap = (
  map: string[],
  initialLowHighValue: RangeType
): number => {
  const lowHighValue: RangeType = map.reduce((rangeMap, coordinate) => {
    const isUpperEntry = isUpperCoordinate(coordinate);
    const half = (rangeMap.high - rangeMap.low) / 2;

    if (isUpperEntry) {
      return { low: rangeMap.low, high: rangeMap.low + half };
    }

    return { low: rangeMap.high - half, high: rangeMap.high };
  }, initialLowHighValue);

  return lowHighValue.low;
};

const getRow = (code: string): number => {
  const rowMap = getRowMapFromCode(code);

  return findEntryPerMap(rowMap, { low: 0, high: 128 });
};

const getColumn = (code: string): number => {
  const columnMap = getColumnMapFromCode(code);

  return findEntryPerMap(columnMap, { low: 0, high: 8 });
};

const getSeatId = (row: number, column: number): number => row * 8 + column;

const getParsedSeat = (code: string): SeatInfo => {
  const row = getRow(code);
  const column = getColumn(code);

  return {
    id: getSeatId(row, column),
    row,
    column,
  };
};

const getSortedSeats = (seats: SeatInfo[]): SeatInfo[] =>
  seats.sort((seatA, seatB) => {
    const ida = seatA.id;
    const idb = seatB.id;
    return ida - idb;
  });

export const getHighestSeatId = (): number => {
  const seats = input.map(getParsedSeat);
  const sortedSeats = getSortedSeats(seats);

  return sortedSeats.reverse()[0].id;
};

// for part2
const getMaxAndMinRow = (seats: SeatInfo[]): MinMaxType => {
  const rows = seats.map((seat) => seat.row);

  return {
    max: Math.max(...rows),
    min: Math.min(...rows),
  };
};

const getMaxAndMinColumn = (seats: SeatInfo[]): MinMaxType => {
  const columns = seats.map((seat) => seat.column);

  return {
    max: Math.max(...columns),
    min: Math.min(...columns),
  };
};

const getMaxAndMinRowAndColumn = (
  seats: SeatInfo[]
): { maxRow: number; maxColumn: number; minRow: number; minColumn: number } => {
  const minMaxRow = getMaxAndMinRow(seats);
  const minMaxColumn = getMaxAndMinColumn(seats);

  return {
    maxRow: minMaxRow.max,
    minRow: minMaxRow.min,
    maxColumn: minMaxColumn.max,
    minColumn: minMaxColumn.min,
  };
};

const getSeatsMapPerId = (seats: SeatInfo[]): { [key: number]: SeatInfo } => {
  return seats.reduce<Record<number, SeatInfo>>((seatsMap, seat) => {
    seatsMap[seat.id] = seat;

    return seatsMap;
  }, {});
};

const getInitialColumn = (minRow: number, seats: SeatInfo[]): number => {
  const seatsFromInitialRow: SeatInfo[] = seats.filter(
    (seat) => seat.row === minRow
  );
  const columns: number[] = seatsFromInitialRow.map((seat) => seat.column);

  return Math.min(...columns);
};

export const getBoardingSeatId = (): number => {
  const seats = input.map(getParsedSeat);
  const { maxRow, minRow, maxColumn, minColumn } = getMaxAndMinRowAndColumn(
    seats
  );
  // just in case first column is not the as the min column
  const initialColumn = getInitialColumn(minRow, seats);
  const seatsMap = getSeatsMapPerId(seats);

  let seat: SeatInfo | null = null;

  for (let row = minRow; row <= maxRow; row += 1) {
    for (
      let column = row === minRow ? initialColumn : minColumn;
      column <= maxColumn;
      column += 1
    ) {
      const seatId = getSeatId(row, column);

      if (!seatsMap[seatId]) {
        seat = { row, column, id: seatId };
      }

      if (!!seat) {
        break;
      }
    }

    if (!!seat) {
      break;
    }
  }

  return seat?.id || 0;
};
