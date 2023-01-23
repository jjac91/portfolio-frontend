import React, { useState } from "react";
import WeatherApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../common/SearchForm";
import SaveLocationForm from "./SaveLocationForm";
import Alert from "../common/Alert";

function NewLocation() {
  const [loaded, setLoaded] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [hasError, setHasError] = useState(false);

  /**Calls the api to search for location info */
  async function search(name) {
    setLoaded(false);
    try {
      let apiResponse = await WeatherApi.getNewLocation(name);
      setApiResponse(apiResponse);
    } catch(err) {
      console.error(err)
      setHasError(true);
    }
    setLoaded(true);
  }

  /**Handles the response from the backend backend query
   * Either handle the error or shows the addresss
   */
  function handleSearchResult(apiResponse) {
    return apiResponse.error ? (
      <div>
        <p className= "lead mb-3 mt-1.5 ml-3 mr-3 font-weight-bold">{handleSearchError(apiResponse.error.code)}</p>
      </div>
    ) : (
      <div>
        <p className= "lead mb-3 mt-1.5 ml-3 mr-3 font-weight-bold">
          Does {handleLocationName(apiResponse)} look correct? If it is, give it
          a name to save it by.
        </p>
        <div>
          <SaveLocationForm
            apiResponse={apiResponse}
            placeHolder={"Name this location"}
          />
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
  if (hasError === true) {
    return (
      <Alert
      type="danger"
      messages={["Unable to process the request, please try again later."]}
    />
    );
  }
  if (!loaded) return <LoadingSpinner />;

  return (
    <div className="NewLocation col-md-8 offset-md-2">
      <div className="card">
        <h2 className="mb-3 mt-3 ml-3 mr-3">Add a New Location to Track</h2>
        <p className="lead mb-3 mt-3 ml-3 mr-3 font-weight-bold">
          Look up an address, city, or region in order to track its weather
        </p>
        <SearchForm searchFor={search} placeHolder={"Enter location here"} />
        {apiResponse ? handleSearchResult(apiResponse) : <div />}
      </div>
    </div>
  );
}
export default NewLocation;
