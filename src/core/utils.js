import { DEFAULT_CELL, DISABLED_CELL, START_STOP_CELL } from "./constants";

export const getPreparedMatrixAfterCellAction = (
  oldMatrix,
  cellRowIndex,
  cellColumnIndex,
  isStartStopMode,
  isBlockingMode
) => {
  let tempMatrix = structuredClone(oldMatrix);
  const isDisabledCell =
    tempMatrix[cellRowIndex][cellColumnIndex] === DISABLED_CELL;
  const isStartStopCell =
    tempMatrix[cellRowIndex][cellColumnIndex] === START_STOP_CELL;
  if (isStartStopMode) {
    if (isStartStopCell) {
      tempMatrix[cellRowIndex][cellColumnIndex] = DEFAULT_CELL;
    } else if (isDisabledCell) {
      alert("Данная ячейка заблокирована другим действием");
    } else if (
      tempMatrix.flat().filter((el) => el === START_STOP_CELL).length < 2
    ) {
      tempMatrix[cellRowIndex][cellColumnIndex] = START_STOP_CELL;
    } else {
      alert("Уже выбраны 2 ячейки");
    }
    return tempMatrix;
  } else if (isBlockingMode) {
    if (isDisabledCell) {
      tempMatrix[cellRowIndex][cellColumnIndex] = DEFAULT_CELL;
    } else if (isStartStopCell) {
      alert("Данная ячейка заблокирована другим действия");
    } else {
      tempMatrix[cellRowIndex][cellColumnIndex] = DISABLED_CELL;
    }
    return tempMatrix;
  }
};

const findIndexStartStopCells = (matrix) => {
  let arrayStartStop = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === START_STOP_CELL) {
        arrayStartStop.push([i, j]);
      }
    }
  }
  return arrayStartStop;
};

export const getShortestPath = (matrix, changeMatrix) => {
  const startStop = findIndexStartStopCells(matrix);

  const start = startStop[0];
  const stop = startStop[1];

  const rows = matrix.length;
  const cols = matrix[0].length;

  const isValid = (x, y) => {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  };

  // Смещения для перемещения в соседние ячейки: вверх, вниз, влево, вправо
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // Очередь для BFS
  const queue = [{ x: start[0], y: start[1], dist: 0, path: [] }];

  // Массив для отслеживания посещенных точек
  const visited = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(false));
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const current = queue.shift();
    const x = current.x;
    const y = current.y;
    const dist = current.dist;
    const path = current.path;

    if (x === stop[0] && y === stop[1]) {
      changeMatrix((old) => {
        let newMatrix = structuredClone(old);
        path
          .filter((el) => !(el.x === start[0] && el.y === start[1]))
          .forEach((cell) => {
            newMatrix[cell.y][cell.x] = 4;
          });
        return newMatrix;
      });
      return { dist, path }; // Мы достигли конечной точки
    }

    // Перемещаемся во все соседние ячейки
    for (let i = 0; i < 4; i++) {
      const newX = x + dx[i];
      const newY = y + dy[i];

      if (
        isValid(newX, newY) &&
        (matrix[newX][newY] === DEFAULT_CELL ||
          matrix[newX][newY] === START_STOP_CELL) &&
        !visited[newX][newY]
      ) {
        queue.push({
          x: newX,
          y: newY,
          dist: dist + 1,
          path: [...path, { x, y }],
        });
        changeMatrix((old) => {
          let newMatrix = structuredClone(old);
          if (!(newX === stop[0] && newY === stop[1])) {
            newMatrix[newX][newY] = 3;
          }
          return newMatrix;
        });
        visited[newX][newY] = true;
      }
    }
  }

  return { dist: -1, path: [] }; // Конечная точка недостижима
};
