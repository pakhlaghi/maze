import React, { Component } from "react";
import solveMaze from "./maze";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: `###########
s #   #   #
# # # # # #
#   #   # #
######### #
# #       #
# # #######
# #   #   #
# # # ### #
#   #     f
###########`,
      notifications: [],
      result: ""
    };
  }

  render() {
    const handleClick = () => {
      const { notifications, result } = solveMaze(this.state.maze);
      this.setState({ notifications, result });
    };

    const handleChange = e => {
      this.setState({ maze: e.target.value });
    };

    var textAreaStyle = {
      fontFamily: "Courier New"
    };

    return (
      <div className="App">
        <textarea
          rows="8"
          cols="50"
          onChange={handleChange}
          style={textAreaStyle}
        >
          {this.state.maze}
        </textarea>
        <div>
          <button onClick={handleClick}>Start</button>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.result }}
          style={textAreaStyle}
        />
        <maze startPoint={this.state.maze} />
      </div>
    );
  }
}

export default App;

// ###################
// s #              ##
// # # ############ ##
// #   ###          ##
// ####### ###########
// # ##### ###########
// # ##### ###########
// # #####      ######
// # ##### #### ######
// # ##### ####      #
// # ##### #### ######
// #       ####      f
// ###################
