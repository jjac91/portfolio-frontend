import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router";
import userEvent from "@testing-library/user-event";
import SaveLocationForm from "./SaveLocationForm";
import { UserProvider } from "../testUtils";
import WeatherApi from "../api/api";
import { useHistory } from "react-router-dom";
import { createMemoryHistory } from "history";
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

// it("redirects on successful submit", function() {
//   render(
//     <Router history={history}>
//       <UserProvider>
//         <SaveLocationForm apiResponse={location} />
//       </UserProvider>
//     </Router>
//   );
// });
