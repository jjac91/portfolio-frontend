import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import WeatherApi from "../api/api";
import SavedLocation from "./SavedLocation";
jest.mock("../api/api");

it("renders without crashing", async function() {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserProvider>
            <SavedLocation />
          </UserProvider>
        </MemoryRouter>
      );
    });
  });