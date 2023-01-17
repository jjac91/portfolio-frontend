import React, { useState, useEffect, useContext } from "react";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import WeatherApi from "../api/api";

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

  function Location(location) {
    return (
      <li key={location.id}>
        <Link to={`/location/${location.username}/${location.id}`}>
          {location.label}
        </Link>
      </li>
    );
  }

  return (
    <div>
      {locations ? (
        <div>
          <h1>{currentUser.username}'s saved locations</h1>
          {locations.length ? (
            <div>
              <ul>{locations.map(Location)}</ul>
            </div>
          ) : (
            <div>
              <p>No saved locations</p>
            </div>
          )}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
export default SavedLocationsList;
