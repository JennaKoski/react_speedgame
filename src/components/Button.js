import React from "react";

const Button = (props) => {
  return (
    <div className="buttons">
      <button type={props.type || "button"} onClick={props.click}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
