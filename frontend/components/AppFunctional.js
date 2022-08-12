import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
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

    return coordinates[index];
  }

  // function getXYMessage() {
  //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
  //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
  //   // returns the fully constructed string.
  // }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const coordinates = getXY();
    switch (direction) {
      case "left":
        if (coordinates.x === -1) {
          setMessage("You can't go left");
          return;
        }
        setIndex(index - 1);
        break;
      case "up":
        if (coordinates.y === -1) {
          setMessage("You can't go up");
          return;
        }
        setIndex(index - 3);
        break;
      case "right":
        if (coordinates.x === 1) {
          setMessage("You can't go right");
          return;
        }
        setIndex(index + 1);
        break;
      case "down":
        if (coordinates.y === 1) {
          setMessage("You can't go down");
          return;
        }
        setIndex(index + 3);
        break;
      default:
    }
    setSteps(steps + 1);
    setMessage("");
  }

  // function move(evt) {
  //   // This event handler can use the helper above to obtain a new index for the "B",
  //   // and change any states accordingly.
  // }

  // function onChange(evt) {
  //   // You will need this to update the value of the input.
  // }

  const { x, y } = getXY();

  function onSubmit(evt) {
    evt.preventDefault()
    // Use a POST request to send a payload to the server.
    axios.post("http://localhost:9000/api/result", {
      x: x + 2, 
      y: y + 2, 
      steps, 
      email,
    })
    .then((response) => {
      setMessage(response.data.message)
      setEmail("");
    })
    .catch((err)=>{
      setMessage(err.response.data.message)
      setEmail("");
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x + 2}, {y + 2})
        </h3>
        <h3 id="steps">You moved {steps} time{ steps === 1 ? "" : "s"}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button
          id="left"
          onClick={() => {
            getNextIndex("left");
          }}
        >
          LEFT
        </button>
        <button
          id="up"
          onClick={() => {
            getNextIndex("up");
          }}
        >
          UP
        </button>
        <button
          id="right"
          onClick={() => {
            getNextIndex("right");
          }}
        >
          RIGHT
        </button>
        <button
          id="down"
          onClick={() => {
            getNextIndex("down");
          }}
        >
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
