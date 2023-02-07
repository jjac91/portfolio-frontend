import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import WeatherApi from "../api/api";
import SearchForm from "../common/SearchForm";
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
/**Handles submitting of the form, attaches the user derived label from the from
 * to the location object and then submits it to the backend if it fails.
 * Posts errors to the the parent component if they occur
 */
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
    <SearchForm placeHolder={"Enter Location name..."} submit={handleSubmit} change={handleChange} val={label} />
  );
}

export default SaveLocationForm;
