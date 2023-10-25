export const MATRIX_SIZE = 15;

export const DEFAULT_CELL = 1;
export const DISABLED_CELL = 0;
export const START_STOP_CELL = 2;
export const CHECKED_CELL = 3;
export const ROUTE_CELL = 4;

export const INITIAL_MATRIX = Array.from({ length: MATRIX_SIZE }, () =>
  Array.from({ length: MATRIX_SIZE }, () => DEFAULT_CELL)
);
