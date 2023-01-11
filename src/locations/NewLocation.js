import React, { useState, useEffect, useContext } from "react";
import { Label } from "reactstrap";
import WeatherApi from "../api/api";
import SearchForm from "../common/SearchForm";
import UserContext from "../auth/UserContext";

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

  function SaveLocationForm(apiResponse) {
    console.log("save location form", apiResponse)
    const { currentUser } = useContext(UserContext);
    const [data, setData] = useState({
      stNumber: apiResponse.locationData.stNumber,
      addressSt: apiResponse.locationData.addressSt,
      city: apiResponse.locationData.city,
      stateName: apiResponse.locationData.stateName,
      prov: apiResponse.locationData.prov,
      countryName: apiResponse.locationData.countryName,
      label: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        let res = await WeatherApi.postNewLocation(currentUser.username, data);
        console.log(res);
      } catch (errors) {
        console.error("post failed", errors);
      }
    }

    function handleChange(evt) {
      const { name, value } = evt.target;
      setData((data) => ({ ...data, [name]: value }));
    }

    return (
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
            className="form-control form-control-lg flex-grow-1"
            name="label"
            placeholder="Enter Location name.."
            value={data.label}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="NewLocation">
      <SearchForm searchFor={search} />
      {apiResponse ? handleSearchResult(apiResponse) : <div />}
    </div>
  );
}
export default NewLocation;
