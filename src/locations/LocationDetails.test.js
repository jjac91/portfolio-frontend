import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LocationDetails from "./LocationDetails";
import { UserProvider } from "../testUtils";
import WeatherApi from "../api/api";
jest.mock("../api/api");

beforeEach(() => {
  WeatherApi.getLocation.mockClear();
  WeatherApi.getWeather.mockClear();
});

const location = {
  location: {
    id: 1,
    label: "Philly",
    stNumber: null,
    addressSt: null,
    stateName: null,
    city: "Philadelphia",
    prov: "US",
    countryName: "United States of America",
    longt: "-75.14225",
    latt: "40.00395",
    username: "u1",
  },
}

const weather = {
  advice: {
    feelsLike:
      "It feels extremely hot. Try to avoid staying outside for long periods of time.",
    uv:
      "Moderate risk of harm from UV rays if unprotected. Try to stay in shade when the Sun is strongest. If outdoors, wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, as well as after swimming or sweating.",
    wind: "There is a gentle breeze. No extra precautions needed",
  },
  weather: {
    current: {
      clouds: 40,
      dew_point: 275.99,
      dt: 1646318698,
      feels_like: 278.41,
      humidity: 65,
      pressure: 1014,
      sunrise: 1646306882,
      sunset: 1646347929,
      temp: 282.21,
      uvi: 2.55,
      visibility: 10000,
      weather: [
        {
          description: "scattered clouds",
          icon: "03d",
          id: 802,
          main: "Clouds",
        },
      ],
      wind_deg: 360,
      wind_gust: 13.89,
      wind_speed: 8.75,
    },
    lat: 39.31,
    lon: -74.5,
    timezone: "America/New_York",
    timezone_offset: -18000,
  },
};


it("renders without crashing", async function() {
  await act(async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <LocationDetails />
        </UserProvider>
      </MemoryRouter>
    );
  });
});

it("should should render the weather and advice", async function() {
  await act(async () => {
    WeatherApi.getWeather.mockReturnValueOnce(weather);
    WeatherApi.getLocation.mockReturnValueOnce(location);

    render(
      <MemoryRouter>
        <UserProvider>
          <LocationDetails />
        </UserProvider>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(
        "Philly"
      )
    ).toBeVisible();

    expect(
      await screen.findByText(
        "It feels extremely hot. Try to avoid staying outside for long periods of time."
      )
    ).toBeVisible();
  });
});

it("should render an api error", async function() {
  await act(async () => {
    WeatherApi.getLocation.mockReturnValueOnce();
    
    render(
      <MemoryRouter>
        <UserProvider>
          <LocationDetails />
        </UserProvider>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(
        "Unable to process the request, please try again later."
      )
    ).toBeVisible();
  });
});
