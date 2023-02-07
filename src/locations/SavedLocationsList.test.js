import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import WeatherApi from "../api/api";
import SavedLocationsList from "./SavedLocationsList";
jest.mock("../api/api");

beforeEach(() => {
  WeatherApi.getUser.mockClear();
});
const user = {
  user: {
    username: "u1",
    name: "U1N",
    isAdmin: false,
    locations: [
      {
        addressSt: null,
        city: "Philadelphia",
        countryName: "United States of America",
        id: 1,
        label: "Philly",
        latt: "40.00395",
        longt: "-75.14225",
        prov: "US",
        stNumber: null,
        stateName: null,
        username: "u1",
      },
    ],
  },
};
it("renders without crashing", async function() {
  WeatherApi.getUser.mockReturnValueOnce(user);
  await act(async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <SavedLocationsList />
        </UserProvider>
      </MemoryRouter>
    );
  });
});
