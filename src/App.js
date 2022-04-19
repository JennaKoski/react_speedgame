import { Component } from "react";

import Circle from "./components/Circle";

import { circles } from "./Circles";
import Button from "./components/Button";
import GameOver from "./components/GameOver";

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    showGameOver: false,
    pace: 1500,
    rounds: 0,
    gameOn: false,
  };

  timer = undefined;

  clickHandler = (i) => {
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }

    this.setState({
      score: this.state.score + 1,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 3) {
      this.stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    console.log("rounds", this.state.rounds);

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    this.nextCircle();
    this.setState({ gameOn: true });
  };

  stopHandler = () => {
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gameOn: false });
  };

  closeHandler = () => {
    // You can use either one of these:
    window.location.reload();
    // this.setState({
    //   showGameOver: false,
    //   score: 0,
    //   current: -1,
    // });
  };

  render() {
    return (
      <div>
        <h1>Speedgame</h1>
        <p>Your score: {this.state.score}</p>
        <div className="circles">
          {circles.map((_, i) => (
            <Circle
              key={i}
              id={i}
              click={() => this.clickHandler(i)}
              active={this.state.current === i}
              disabled={this.state.gameOn}
            />
          ))}
        </div>
        <div>
          <Button click={this.startHandler}>START</Button>
          <Button click={this.stopHandler}>STOP</Button>
        </div>
        {this.state.showGameOver && (
          <GameOver click={this.closeHandler} score={this.state.score} />
        )}
      </div>
    );
  }
}

export default App;
