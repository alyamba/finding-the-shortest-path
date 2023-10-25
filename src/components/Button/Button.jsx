import React from "react";
import "./Button.css";

const Button = ({
  text,
  className = "",
  onPress = () => {},
  isDisabled = false,
}) => {
  return (
    <button
      className={`${isDisabled ? "disabled-btn" : className}`}
      onClick={onPress}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
