import React, { useState } from "react";
import { App } from "./App";
import { INITIAL_MATRIX, ROUTE_CELL, START_STOP_CELL } from "./core/constants";
import { getPreparedMatrixAfterCellAction, getShortestPath } from "./core/utils";

export const AppContainer = () => {
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
    setMatrixInEditingMode((old) =>
      getPreparedMatrixAfterCellAction(
        old,
        cellRowIndex,
        cellColumnIndex,
        isStartStopMode,
        isBlockingMode
      )
    );
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

  const handleCleanCells = () => {
    if (window.confirm("Готовы скинуть решение?")) {
      setMatrix(INITIAL_MATRIX);
    }
  };

  const handleFindPath = () => getShortestPath(matrix, setMatrix)

  const isFindPathButtonDisabled = matrix.flat().filter((el) => el === START_STOP_CELL).length !== 2 ||
  isEditingMode

  const hasMatrixRouteCells = matrix.flat().includes(ROUTE_CELL)

  return (
    <App
      matrix={matrix}
      matrixInEditingMode={matrixInEditingMode}
      isEditingMode={isEditingMode}
      isStartStopMode={isStartStopMode}
      isBlockingMode={isBlockingMode}
      isFindPathButtonDisabled={isFindPathButtonDisabled}
      hasMatrixRouteCells={hasMatrixRouteCells}
      enableStartStopMode={enableStartStopMode}
      handleSaveStartStopMode={handleSaveStartStopMode}
      handleCancelStartStopMode={handleCancelStartStopMode}
      handleSaveBlockingMode={handleSaveBlockingMode}
      disableBlockingMode={disableBlockingMode}
      enableBlockingMode={enableBlockingMode}
      handleCellPress={handleCellPress}
      handleCleanCells={handleCleanCells}
      handleFindPath={handleFindPath}
    />
  );
};
