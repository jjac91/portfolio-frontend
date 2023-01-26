import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import WeatherApi from "../api/api";
import { useHistory } from "react-router-dom";


function SaveLocationForm({apiResponse, handleErrorChange}) {
  const history = useHistory();
  const initialData = {
    stNumber: apiResponse.locationData.stNumber,
    addressSt: apiResponse.locationData.addressSt,
    city: apiResponse.locationData.city,
    stateName: apiResponse.locationData.stateName,
    prov: apiResponse.locationData.prov,
    countryName: apiResponse.locationData.countryName,
    longt: apiResponse.locationData.longt,
    latt: apiResponse.locationData.latt,
  };
  
  console.log("save location form", apiResponse);
  const { currentUser } = useContext(UserContext);
  const [label, setLabel] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = { ...initialData, label: label };
    try {
      let res = await WeatherApi.postNewLocation(currentUser.username, data);
      console.log(data, res);
      history.push("/locations");
    } catch (errors) {
      handleErrorChange(errors);
      console.error("post failed", errors);
    }
  }

  function handleChange(evt) {
    setLabel(evt.target.value);
  }

  return (
   <div className="SearchForm  mb-3 mt-1.5 ml-3 mr-3">
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
