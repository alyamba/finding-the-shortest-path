export const MATRIX_SIZE = 100;

export const DEFAULT_CELL = 1;
export const DISABLED_CELL = 0;
export const START_STOP_CELL = 2;
export const ROUTE_CELL = 3;

export const INITIAL_MATRIX = Array.from({ length: MATRIX_SIZE }, () =>
  Array.from({ length: MATRIX_SIZE }, () => DEFAULT_CELL)
);
