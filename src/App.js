import React from "react";
import "./App.css";
import { Button, Matrix } from "./components";

export const App = ({
  matrix,
  matrixInEditingMode,
  isEditingMode,
  isStartStopMode,
  isBlockingMode,
  isFindPathButtonDisabled,
  hasMatrixRouteCells,
  enableStartStopMode,
  handleSaveStartStopMode,
  handleCancelStartStopMode,
  handleSaveBlockingMode,
  disableBlockingMode,
  enableBlockingMode,
  handleCellPress,
  handleCleanCells,
  handleFindPath,
}) => {
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
                  : disableBlockingMode
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
              isDisabled={hasMatrixRouteCells}
            />
            <Button
              className="matrix-action-btn"
              onPress={enableBlockingMode}
              text="Заблокировать ячейки"
              isDisabled={hasMatrixRouteCells}
            />
          </>
        )}
      </div>
      <Matrix
        matrix={matrix}
        matrixInEditingMode={matrixInEditingMode}
        isEditingMode={isEditingMode}
        handleCellPress={handleCellPress}
      />
      <div className="main-btn-container">
        {hasMatrixRouteCells ? (
          <Button
            className="clear-btn"
            onPress={handleCleanCells}
            text="Сбросить данные"
          />
        ) : (
          <Button
            className="start-path-btn"
            onPress={handleFindPath}
            text="Построить маршрут"
            isDisabled={isFindPathButtonDisabled}
          />
        )}
      </div>
    </div>
  );
};
