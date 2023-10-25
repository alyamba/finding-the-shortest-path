import React, { useMemo } from "react";
import "./Cell.css";
import {
  DISABLED_CELL,
  ROUTE_CELL,
  START_STOP_CELL,
} from "../../core/constants";

const Cell = ({
  value,
  onPress = () => {},
  rowIndex,
  columnIndex,
  isDisabled = false,
}) => {
  const cellTypeClassName = useMemo(
    () =>
      value === DISABLED_CELL
        ? "disabled"
        : value === START_STOP_CELL
        ? "start-stop"
        : // : value === CHECKED_CELL
        // ? "checked"
        value === ROUTE_CELL
        ? "route"
        : "",
    [value]
  );
  const handleCellPress = () => {
    if (!isDisabled) {
      onPress(rowIndex, columnIndex);
    }
  };
  return (
    <div
      className={`cell ${cellTypeClassName}`}
      onClick={handleCellPress}
    ></div>
  );
};

export default Cell;
