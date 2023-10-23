import React from "react";
import "./Button.css";

const Button = ({ text, className = "", onPress = () => {} }) => {
  return (
    <button className={className} onClick={onPress}>
      {text}
    </button>
  );
};

export default Button;
