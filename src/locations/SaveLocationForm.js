import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import WeatherApi from "../api/api";

function SaveLocationForm(apiResponse) {
  const initialData = {
    stNumber: apiResponse.apiResponse.locationData.stNumber,
    addressSt: apiResponse.apiResponse.locationData.addressSt,
    city: apiResponse.apiResponse.locationData.city,
    stateName: apiResponse.apiResponse.locationData.stateName,
    prov: apiResponse.apiResponse.locationData.prov,
    countryName: apiResponse.apiResponse.locationData.countryName,
  };
  console.log("save location form", apiResponse);
  const { currentUser } = useContext(UserContext);
  const [label, setLabel] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = { ...initialData, label: label };
    try {
      let res = await WeatherApi.postNewLocation(currentUser.username, data);
      console.log(data, res);
    } catch (errors) {
      console.error("post failed", errors);
    }
  }

  function handleChange(evt) {
    setLabel(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="label"
          placeholder="Enter Location name.."
          value={label}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SaveLocationForm;
