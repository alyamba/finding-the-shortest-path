import { useState } from "react";
import "./App.css";
import { Cell, Button } from "./components";
import {
  DEFAULT_CELL,
  START_STOP_CELL,
  DISABLED_CELL,
  ROUTE_CELL,
  INITIAL_MATRIX,
} from "./core/constants";
import { shortestPath } from "./core/utils";

const App = () => {
  const [matrix, setMatrix] = useState(INITIAL_MATRIX);

  const [matrixInEditingMode, setMatrixInEditingMode] = useState(null);
  const [isEditingMode, setEditingMode] = useState(false);
  const [isStartStopMode, setStartStopMode] = useState(false);
  const [isBlockingMode, setBlockingMode] = useState(false);

  const enableStartStopMode = () => {
    setMatrixInEditingMode(structuredClone(matrix));
    setStartStopMode((old) => !old);
    setEditingMode((old) => !old);
  };

  const disableStartStopMode = () => {
    setMatrixInEditingMode(null);
    setStartStopMode((old) => !old);
    setEditingMode((old) => !old);
  };

  const handleCellPress = (cellRowIndex, cellColumnIndex) => {
    if (isStartStopMode) {
      setMatrixInEditingMode((old) => {
        let tempMatrix = structuredClone(old);
        const isDisabledCell =
          tempMatrix[cellRowIndex][cellColumnIndex] === DISABLED_CELL;
        const isStartStopCell =
          tempMatrix[cellRowIndex][cellColumnIndex] === START_STOP_CELL;
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
      });
    } else if (isBlockingMode) {
      setMatrixInEditingMode((old) => {
        let tempMatrix = structuredClone(old);
        const isDisabledCell =
          tempMatrix[cellRowIndex][cellColumnIndex] === DISABLED_CELL;
        const isStartStopCell =
          tempMatrix[cellRowIndex][cellColumnIndex] === START_STOP_CELL;
        if (isDisabledCell) {
          tempMatrix[cellRowIndex][cellColumnIndex] = DEFAULT_CELL;
        } else if (isStartStopCell) {
          alert("Данная ячейка заблокирована другим действия");
        } else {
          tempMatrix[cellRowIndex][cellColumnIndex] = DISABLED_CELL;
        }
        return tempMatrix;
      });
    }
  };

  const handleSaveStartStopMode = () => {
    if (
      matrixInEditingMode.flat().filter((el) => el === START_STOP_CELL)
        .length !== 2
    ) {
      alert("Выберите 2 ячейки: старт и стоп");
    } else {
      setMatrix(structuredClone(matrixInEditingMode));
      disableStartStopMode();
    }
  };

  const handleCancelStartStopMode = () => {
    disableStartStopMode();
  };

  const enableBlockingMode = () => {
    setMatrixInEditingMode(structuredClone(matrix));
    setBlockingMode((old) => !old);
    setEditingMode((old) => !old);
  };

  const disableBlockingMode = () => {
    setMatrixInEditingMode(null);
    setBlockingMode((old) => !old);
    setEditingMode((old) => !old);
  };

  const handleSaveBlockingMode = () => {
    setMatrix(structuredClone(matrixInEditingMode));
    disableBlockingMode();
  };

  const handleCancelBlockingMode = () => {
    disableBlockingMode();
  };

  const handleCleanCells = () => {
    if (window.confirm("Готовы скинуть решение?")) {
      setMatrix(INITIAL_MATRIX);
    }
  };

  return (
    <div className="App">
      <div className="header-btns-container">
        {isStartStopMode || isBlockingMode ? (
          <>
            <Button
              className="matrix-action-btn"
              onPress={
                isStartStopMode
                  ? handleSaveStartStopMode
                  : handleSaveBlockingMode
              }
              text="Сохранить"
            />
            <Button
              className="matrix-action-btn"
              onPress={
                isStartStopMode
                  ? handleCancelStartStopMode
                  : handleCancelBlockingMode
              }
              text="Отмена"
            />
          </>
        ) : (
          <>
            <Button
              className="matrix-action-btn"
              onPress={enableStartStopMode}
              text="Старт-стоп ячейки"
            />
            <Button
              className="matrix-action-btn"
              onPress={enableBlockingMode}
              text="Заблокировать ячейки"
            />
          </>
        )}
      </div>
      <div className="matrix-container">
        {isEditingMode
          ? matrixInEditingMode.map((matrixRow, rowIndex) => {
              return (
                <div key={rowIndex} className="line-container">
                  {matrixRow.map((element, columnIndex) => (
                    <Cell
                      key={`${rowIndex}-${columnIndex}-editing-mode`}
                      value={element}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      onPress={handleCellPress}
                    />
                  ))}
                </div>
              );
            })
          : matrix.map((matrixRow, rowIndex) => {
              return (
                <div key={rowIndex} className="line-container">
                  {matrixRow.map((element, columnIndex) => (
                    <Cell
                      key={`${rowIndex}-${columnIndex}`}
                      value={element}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      onPress={handleCellPress}
                    />
                  ))}
                </div>
              );
            })}
      </div>
      {matrix.flat().includes(ROUTE_CELL) ? (
        <>
          <Button
            className="clear-btn"
            onPress={handleCleanCells}
            text="Сбросить данные"
            isDisabled={
              matrix.flat().filter((el) => el === START_STOP_CELL).length !== 2
            }
          />
        </>
      ) : (
        <>
          <Button
            className="start-path-btn"
            onPress={() => shortestPath(matrix, setMatrix)}
            text="Построить маршрут"
            isDisabled={
              matrix.flat().filter((el) => el === START_STOP_CELL).length !==
                2 || isEditingMode
            }
          />
        </>
      )}
    </div>
  );
};

export default App;
