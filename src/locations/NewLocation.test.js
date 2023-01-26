import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import NewLocation from "./NewLocation";
import { UserProvider } from "../testUtils";
import WeatherApi from "../api/api";
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

const testError ={error: {
    code: "008",
    description: "7. Your request did not produce any results.",
  }}

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <NewLocation />
      </UserProvider>
    </MemoryRouter>
  );
});

it("should get an address", async () => {
  WeatherApi.getNewLocation.mockReturnValueOnce(location);
  render(
    <MemoryRouter>
      <UserProvider>
        <NewLocation />
      </UserProvider>
    </MemoryRouter>
  );

  //simulate filling up the textbox
  const locationNameInput = screen.getByRole("textbox");
  fireEvent.change(locationNameInput, { target: { value: "philadelphia" } });
  expect(locationNameInput.value).toBe("philadelphia");

  //click the button
  const submitBtn = screen.getByRole("button", { name: "Submit" });
  expect(submitBtn).not.toBeDisabled();
  userEvent.click(submitBtn);

  //Verify address is displayed
  expect(
    await screen.findByText(
      "Does Philadelphia", {exact: false}
    )
  ).toBeVisible();
});

it("should render an error", async () => {
    WeatherApi.getNewLocation.mockReturnValueOnce(testError);
    render(
      <MemoryRouter>
        <UserProvider>
          <NewLocation />
        </UserProvider>
      </MemoryRouter>
    );
  
    //simulate filling up the textbox
    const locationNameInput = screen.getByRole("textbox");
    fireEvent.change(locationNameInput, { target: { value: "philadelphia" } });
    expect(locationNameInput.value).toBe("philadelphia");
  
    //click the button
    const submitBtn = screen.getByRole("button", { name: "Submit" });
    expect(submitBtn).not.toBeDisabled();
    userEvent.click(submitBtn);
  
    //Verify error message is displayed
    expect(
      await screen.findByText(
        "Unable to find location. Try changing your search term", {exact: false}
      )
    ).toBeVisible();
  });

  it("should render an api error", async () => {
    WeatherApi.getNewLocation.mockReturnValueOnce();
    render(
      <MemoryRouter>
        <UserProvider>
          <NewLocation />
        </UserProvider>
      </MemoryRouter>
    );
  
    //simulate filling up the textbox
    const locationNameInput = screen.getByRole("textbox");
    fireEvent.change(locationNameInput, { target: { value: "philadelphia" } });
    expect(locationNameInput.value).toBe("philadelphia");
  
    //click the button
    const submitBtn = screen.getByRole("button", { name: "Submit" });
    expect(submitBtn).not.toBeDisabled();
    userEvent.click(submitBtn);
  
    //Verify error message is displayed
    expect(
      await screen.findByText(
        "Unable to process the request", {exact: false}
      )
    ).toBeVisible();
  });
