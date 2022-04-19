import React from "react";

const GameOver = (props) => {
  let message = "";

  if (props.score <= 5) {
    message = "You can do better than that";
  } else if (props.score <= 10) {
    message = "You still need a little practice";
  } else if (props.score >= 11 && props.score <= 20) {
    message = "Pretty good";
  } else {
    message = "Very good!";
  }

  return (
    <div className="overlay">
      <div className="gameover_box">
        <h2>GAME OVER</h2>
        <p>Score was: {props.score} </p>
        <p>{message}</p>
        <button id="close" onClick={props.click}>
          X
        </button>
      </div>
    </div>
  );
};

export default GameOver;
