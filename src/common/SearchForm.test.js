import React from "react";
import { render, } from "@testing-library/react";
import SearchForm from "./SearchForm";

it("renders without crashing", function() {
  render(<SearchForm/>)
});
