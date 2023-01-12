import React, { useState, useEffect, useContext } from "react";
import { Label } from "reactstrap";
import WeatherApi from "../api/api";
import SearchForm from "../common/SearchForm";
import SaveLocationForm from "./SaveLocationForm";

function NewLocation() {
  const [apiResponse, setApiResponse] = useState(null);

  /**Calls the api to search for location info */
  async function search(name) {
    let apiResponse = await WeatherApi.getNewLocation(name);
    setApiResponse(apiResponse);
  }

  /**Handles the response from the backend backend query
   * Either handle the error or shows the addresss
   */
  function handleSearchResult(apiResponse) {
    return apiResponse.error ? (
      <div>
        <p>{handleSearchError(apiResponse.error.code)}</p>
      </div>
    ) : (
      <div>
        <p>
          Is {handleLocationName(apiResponse)} correct? If it is, give it a name
          to save it by.
        </p>
        <div>
            <SaveLocationForm apiResponse={apiResponse}/>
        </div>
      </div>
    );
  }

  /**handles error codes that result from a successful call to the geocode
   * api via the backend api
   */
  function handleSearchError(code) {
    return code === "008" || "007"
      ? "Unable to find location. Try changing your search term"
      : "Unable to connect to location database. Please try again later";
  }

  /**Formats address data into a clean well formatted string */
  function handleLocationName(apiResponse) {
    const values = [
      apiResponse.locationData.stNumber,
      apiResponse.locationData.addressSt,
      apiResponse.locationData.city,
      apiResponse.locationData.stateName,
      apiResponse.locationData.prov,
      apiResponse.locationData.countryName,
    ];
    return values.join(" ");
  }

  return (
    <div className="NewLocation">
      <SearchForm searchFor={search} />
      {apiResponse ? handleSearchResult(apiResponse) : <div />}
    </div>
  );
}
export default NewLocation;
