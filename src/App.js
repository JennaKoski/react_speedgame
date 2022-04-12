import { Component } from "react";

import Circle from "./components/Circle";

import { circles } from "./Circles";
import Button from "./components/Button";
import Popup from "./components/Popup";

const getRndInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class App extends Component {
  state = {
    score: 0,
    current: 0,
  };

  timer = undefined;

  clickHandler = (i) => {
    console.log("clickHandler, circle number:", i);
    this.setState({
      score: this.state.score + 1,
    });
  };

  nextCircle = () => {
    let nextActive;

    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
    });
    console.log("Active circle:", this.state.current);

    this.timer = setTimeout(this.nextCircle, 1000);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);
  };

  render() {
    return (
      <div>
        <h1>Speedgame</h1>
        <p>Your score: {this.state.score}</p>
        <div className="circles">
          {circles.map((_, i) => (
            <Circle key={i} id={i} click={() => this.clickHandler(i)} />
          ))}
        </div>
        <Button click={this.startHandler}>START</Button>
        <Button click={this.stopHandler}>STOP</Button>
        <Popup />
      </div>
    );
  }
}

export default App;
