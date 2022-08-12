import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(props) {
    super(props);
    this.state = initialState;
    this.getXY=this.getXY.bind(this)
    this.reset=this.reset.bind(this)
    this.getNextIndex=this.getNextIndex.bind(this)
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const coordinates = [
      {
        x: -1,
        y: -1,
      },
      {
        x: 0,
        y: -1,
      },
      {
        x: 1,
        y: -1,
      },
      {
        x: -1,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: -1,
        y: 1,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
    ];

    return coordinates[this.state.index];
  };

  // getXYMessage = () => {
  //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
  //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
  //   // returns the fully constructed string.
  // }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState (initialState) ;

  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const coordinates = this.getXY();
    switch (direction) {
      case "left":
        if (coordinates.x === -1) {
          // setMessage("You can't go left");
          // this.state.message = "You can't go left"
          this.setState({
            message: "You can't go left",
          });
          return;
        }
        // setIndex(index - 1);
        // this.state.index--
        this.setState({
          index: this.state.index - 1,
        });
        break;
      case "up":
        if (coordinates.y === -1) {
          // setMessage("You can't go up");
          // this.state.message = "You can't go up"
          this.setState({
            message: "You can't go up",
          });
          return;
        }
        // setIndex(index - 3);
        // this.state.index -= 3
        this.setState({
          index: this.state.index - 3,
        });
        break;
      case "right":
        if (coordinates.x === 1) {
          // setMessage("You can't go right");
          // this.state.message = "You can't go right"
          this.setState({
            message: "You can't go right",
          });
          return;
        }
        // setIndex(index + 1);
        // this.state.index++
        this.setState({
          index: this.state.index + 1,
        });
        break;
      case "down":
        if (coordinates.y === 1) {
          // setMessage("You can't go down");
          // this.state.message = "You can't go down"
          this.setState({
            message: "You can't go down",
          });
          return;
        }
        // setIndex(index + 3);
        // this.state.index += 3
        this.setState({
          index: this.state.index + 3,
        });
        break;
      default:
    }
    // setSteps(steps + 1);
    // setMessage("");
    this.setState({
      steps: this.state.steps + 1,
      message: "",
    });
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  };

  onChange = (evt) => {
    // You will need this to update the value of the input.
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

    evt.preventDefault();
    const { x, y } = this.getXY();
    axios
      .post("http://localhost:9000/api/result", {
        x: x + 2,
        y: y + 2,
        steps: this.state.steps,
        email: this.state.email,
      })
      .then((response) => {
        // setMessage(response.data.message)
        this.setState({
          message: response.data.message,
          email: "",
        });
      })
      .catch((err) => {
        // setMessage(response.data.message)
        this.setState({
          message: err.response.data.message,
          email: "",
        });
      });
  };

  render() {
    const { className } = this.props;
    const { x, y } = this.getXY();
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x + 2}, {y + 2})</h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps === 1 ? "" : "s"}</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === this.state.index ? " active" : ""}`}>
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left"onClick={()=>{this.getNextIndex("left")}}>LEFT</button>
          <button id="up"onClick={()=>{this.getNextIndex("up")}}>UP</button>
          <button id="right"onClick={()=>{this.getNextIndex("right")}}>RIGHT</button>
          <button id="down"onClick={()=>{this.getNextIndex("down")}}>DOWN</button>
          <button id="reset"onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email"value={this.state.email}
          onChange={(evt) => {
            // setEmail(evt.target.value);
            this.setState({
              email: evt.target.value
            })
          }}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
