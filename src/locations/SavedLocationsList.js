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
    <div>
      <h1>{currentUser.username}'s saved locations</h1>
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
          <p>No saved locations</p>
        </div>
      )}
    </div>
  );
}
export default SavedLocationsList;

// function SavedLocationsList() {
//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const [locations, setLocations] = useState(null);

//   useEffect(function getLocations() {
//     async function getLocations() {
//       let currentUserUpdate = await WeatherApi.getUser(currentUser.username);
//       setCurrentUser(currentUserUpdate);
//       setLocations([...currentUser.locations])
//     }

//     getLocations();
//   }, []);

//
//   return (
//     <div>
//       <h1>{currentUser.username}'s saved locations</h1>
//       {locations.length ? (
//         <div>
//           <ul>
//
//           </ul>
//         </div>
//       ) : (
//         <div>
//           <p>No saved locations</p>
//         </div>
//       )}
//     </div>
//   );
// }
