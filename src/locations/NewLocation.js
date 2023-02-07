import React, { useState } from "react";
import WeatherApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../common/SearchForm";
import SaveLocationForm from "./SaveLocationForm";
import Alert from "../common/Alert";

function NewLocation() {
  const [loaded, setLoaded] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [errors, setErrors] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    // prevents searcing for only white spaces and trims off extra whitepace
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  /**Calls the api to search for location info */
  async function search(name) {
    setLoaded(false);
    setErrors([])
    try {
      let apiResponse = await WeatherApi.getNewLocation(name);
      setApiResponse(apiResponse);
      if (apiResponse.error) {
        handleSearchError(apiResponse.error.code);
      }
    } catch (err) {
      console.error(err);
      setErrors(["Unable to process the request, please try again later."])
    }
    setLoaded(true);
  }

  /**Handles the response from the backend backend query
   * Either handle the error or shows the addresss
   */
  function handleSearchResult(apiResponse) {
    return apiResponse.error ? null : (
      <div>
        <p className="lead mb-3 mt-1.5 ml-3 mr-3 font-weight-bold">
          Does {handleLocationName(apiResponse)} look correct? If it is, give it
          a name to save it by.
        </p>
        <div>
          <SaveLocationForm
            apiResponse={apiResponse}
            placeHolder={"Name this location"}
            handleErrorChange ={handleErrorChange}
          />
        </div>
      </div>
    );
  }

  /**handles error codes that result from a successful call to the geocode
   * api via the backend api
   */
  function handleSearchError(code) {
    if (code === "006") {
      setErrors(["The location server is busy. Please try again in a bit"]);
    }
    if (code === "008" || "007") {
      setErrors(["Unable to find location. Try changing your search term"]);
    }
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

  /** function to allow child component save location form to set errors to this component  */
  function handleErrorChange(error){
    setErrors(error)
  }
  
  if (!loaded) return <LoadingSpinner />;

  return (
    <div className="NewLocation col-md-8 offset-md-2">
      <div className="card">
        <h2 className="mb-3 mt-3 ml-3 mr-3">Add a New Location to Track</h2>
        <p className="lead mb-3 mt-3 ml-3 mr-3 font-weight-bold">
          Look up an address, city, or region in order to track its weather
        </p>
        <SearchForm placeHolder={"Enter location here"} submit={handleSubmit} change={handleChange} val={searchTerm} />
        {apiResponse ? handleSearchResult(apiResponse) : <div />}

        {errors.length ? <Alert type="danger" messages={errors} /> : null}
      </div>
    </div>
  );
}
export default NewLocation;
