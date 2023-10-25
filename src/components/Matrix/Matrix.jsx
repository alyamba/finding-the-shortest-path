import React from "react";
import "./Matrix.css";
import { Cell } from "../../components";

const Matrix = ({
  matrix,
  matrixInEditingMode,
  isEditingMode,
  handleCellPress,
}) => {
  const getMatrixCells = (matrixData) => {
    return matrixData.map((matrixRow, rowIndex) => {
      return (
        <div key={rowIndex} className="matrix-row-container">
          {matrixRow.map((element, columnIndex) => (
            <Cell
              key={`${rowIndex}-${columnIndex}`}
              value={element}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              onPress={handleCellPress}
              isDisabled={!isEditingMode}
            />
          ))}
        </div>
      );
    });
  };

  return (
    <div className="matrix-container">
      {isEditingMode
        ? getMatrixCells(matrixInEditingMode)
        : getMatrixCells(matrix)}
    </div>
  );
};

export default Matrix;
