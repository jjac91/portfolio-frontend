import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SaveLocationForm from "./SaveLocationForm";
import { UserProvider } from "../testUtils";
import WeatherApi from "../api/api";
import { Router } from "react-router";

history.replace = jest.fn();

jest.mock("../api/api");

beforeEach(() => {
  WeatherApi.getNewLocation.mockClear();
});

const location = {
  locationData: {
    stNumber: null,
    addressSt: null,
    stateName: null,
    city: "Philadelphia",
    prov: "US",
    countryName: "United States of America",
    longt: "-75.13576",
    latt: "40.00583",
  },
};

it("renders without crashing", function() {
  render(
    <UserProvider>
      <SaveLocationForm apiResponse={location} />
    </UserProvider>
  );
});

describe("SaveLocation Form", () =>{
  it("redirects on successful submit", function() {
    const mockHistory = {
      push: jest.fn(),
}
  await act(async () => {
    render(
      <UserProvider>
        <Router history={mockHistory}>
          <SaveLocationForm apiResponse={location} />
        </Router>
      </UserProvider>
    )

  //simulate filling up the textbox
  const locationNameInput = screen.getByRole("textbox");
  fireEvent.change(locationNameInput, { target: { value: "philadelphia" } });
  expect(locationNameInput.value).toBe("philadelphia");

  //click the button
  const submitBtn = screen.getByRole("button", { name: "Submit" });
  expect(submitBtn).not.toBeDisabled();
  userEvent.click(submitBtn);
});
expect(mockHistory.push).toBeCalledTime(1)
expect(mockHistory.push).toBeCalledWith("/locations")
})
})