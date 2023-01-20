import React, { useState, useEffect, useContext } from "react";
import UserContext from "../auth/UserContext";
import WeatherApi from "../api/api";
import SavedLocation from "./SavedLocation";
import LoadingSpinner from "../common/LoadingSpinner";

function SavedLocationsList() {
  const { currentUser } = useContext(UserContext);
  const [locations, setLocations] = useState(null);

  useEffect(function getLocations() {
    async function getLocations() {
      let res = await WeatherApi.getUser(currentUser.username);
      setLocations(res.locations);
    }

    getLocations();
  }, []);

  async function deleteLocation(id) {
    try {
      await WeatherApi.deleteLocation(currentUser.username, id);
      setLocations(
        locations.filter(function(loc) {
          return loc.id !== id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (!locations) return <LoadingSpinner />;

  return (
    <div className="SavedLocationList container col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-center">
      <div className="container mx-auto">
        <div className="card text-center">
          <h2 className="mb-1.5 mt-3 ml-3 mr-3">
            {currentUser.username}'s Saved Locations
          </h2>
          <p className="lead mb-3 mt-3 ml-3 mr-3 font-weight-bold">Choose a location to see its weather</p>
          {locations.length ? (
            <div>
              {locations.map((l) => (
                <SavedLocation
                  key={l.id}
                  id={l.id}
                  label={l.label}
                  username={l.username}
                  remove={deleteLocation}
                />
              ))}
            </div>
          ) : (
            <div>
              <p className="lead mb-3 mt-1.5 ml-3 mr-3 font-weight-bold">No saved locations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SavedLocationsList;
