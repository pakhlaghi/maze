import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: "",
      notifications: []
    };
  }

  render() {
    const handleClick = () => {
      let notifications = [];
      let mazeArr = this.state.maze.split("\n");
      let startPoint = { x: 0, y: 0 };
      let finalPoint = { x: 0, y: 0 };
      let startFrom = 0;
      let numberOfStart = 0;
      let numberOfFinal = 0;
      let row = 0;

      for (let i = 0; i < this.state.maze.length; i++) {
        switch (this.state.maze[i].toLowerCase()) {
          case "\n":
            mazeArr.push(this.state.maze.substr(startFrom, i));
            row = row + 1;
            startFrom = i + 1;
            break;
          case "s":
            numberOfStart = numberOfStart + 1;
            startPoint.x = row;
            startPoint.y = i - startFrom;
            break;
          case "f":
            numberOfFinal = numberOfFinal + 1;
            finalPoint.x = row;
            finalPoint.y = i - startFrom;
            break;
          default:
            break;
        }
      }

      if (numberOfFinal > 1) {
        notifications.push({
          status: "warning",
          message: "More than one start point founded"
        });
      }
      if (numberOfFinal == 0) {
        notifications.push({
          status: "error",
          message: "there is no starting point"
        });
      }

      if (numberOfStart > 1) {
        notifications.push({
          status: "warning",
          message: "More than one start point founded"
        });
      }
      if (numberOfStart == 0) {
        notifications.push({
          status: "error",
          message: "there is no starting point"
        });
      }

      console.log(mazeArr);
      console.log(startPoint);
      console.log(finalPoint);

      this.setState({ notifications });
    };

    const handleChange = e => {
      this.setState({ maze: e.target.value });
    };

    return (
      <div className="App">
        <textarea rows="8" cols="50" onChange={handleChange}>
          {this.state.maze}
        </textarea>
        <button onClick={handleClick}>Start</button>
      </div>
    );
  }
}

export default App;
