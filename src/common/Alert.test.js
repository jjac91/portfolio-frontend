import React from "react";
import { render, } from "@testing-library/react";
import Alert from "./Alert";

it("renders without crashing", function() {
  render(<Alert />);
});

it("renders the appropriate message", function() {
    const { asFragment } = render(<Alert type="danger" messages={["hello","goodbye"]} />);
    expect(asFragment()).toMatchSnapshot();
})
