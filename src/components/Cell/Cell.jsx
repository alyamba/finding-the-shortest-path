import React, { useMemo } from "react";
import "./Cell.css";
import { DISABLED_CELL, START_STOP_CELL } from "../../core/constants";

const Cell = ({ value, onPress = () => {}, rowIndex, columnIndex }) => {
  const cellTypeClassName = useMemo(
    () =>
      value === DISABLED_CELL
        ? "disabled"
        : value === START_STOP_CELL
        ? "start-stop"
        : "",
    [value]
  );
  const handleCellPress = () => {
    onPress(rowIndex, columnIndex);
  };
  return (
    <div
      className={`cell ${cellTypeClassName}`}
      onClick={handleCellPress}
    ></div>
  );
};

export default Cell;
