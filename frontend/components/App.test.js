import React from "react";
import AppFunctional from "./AppFunctional";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.setTimeout(1000); // default 5000 too long for Codegrade
const waitForOptions = { timeout: 100 };
const queryOptions = { exact: false };

let up, down, left, right, reset, submit;
let squares, coordinates, steps, message, email;

const updateStatelessSelectors = (document) => {
  up = document.querySelector("#up");
  down = document.querySelector("#down");
  left = document.querySelector("#left");
  right = document.querySelector("#right");
  reset = document.querySelector("#reset");
  submit = document.querySelector("#submit");
};

const updateStatefulSelectors = (document) => {
  squares = document.querySelectorAll(".square");
  coordinates = document.querySelector("#coordinates");
  steps = document.querySelector("#steps");
  message = document.querySelector("#message");
  email = document.querySelector("#email");
};

describe("My Tests", () => {

  beforeEach(() => {
    render(<AppFunctional />);
    updateStatelessSelectors(document);
    updateStatefulSelectors(document);
  });
  afterEach(() => {

    document.body.innerHTML = "";
  });

  test("When page loads the initial coordinates read 2,2", () => {
    expect(coordinates.textContent).toMatch(/\(2.*2\)$/);
  });
  test("When page loads the initial steps read 0", () => {
    expect(steps.textContent).toMatch("You moved 0 times");
  });
  test("When page loads the left button says left", () => {
    expect(left.textContent).toMatch("LEFT");
  });
  test("When page loads the reset button says reset", () => {
    expect(reset.textContent).toMatch("reset");
  });
  test("When typing in the email box the value changes", () => {
    fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
    expect(email.value).toMatch('lady@gaga.com');
  });
});
