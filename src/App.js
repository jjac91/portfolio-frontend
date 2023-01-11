import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./nav-routes/Routes";
import NavBar from "./nav-routes/NavBar";
import UserContext from "./auth/UserContext";
import WeatherApi from "./api/api";
import useLocalStorage from "./hooks/UseLocalStorage";
import jwt from "jsonwebtoken";

/** Weather application
 *
 * token: this is the jwt for logged in users
 *  is required for some api calls
 *  initially read from local storage and synced using useLocalStorage hook
 *
 * currentUser:user obj from API. This is how to tell if the user is logged in
 *  made available through app via context
 */

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);
  const [locationIds, setLocationids] = useState([]);

  /** Loads user info from API. Will not run until a user is logged in
   *  and has a token. It should only need to rerun if a user logs out
   *  so its effect depends on the value of token
   */
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          WeatherApi.token = token;
          let currentUser = await WeatherApi.getUser(username);
          setCurrentUser(currentUser);
          setLocationids([...currentUser.locations]);
        } catch (error) {
          console.error(error);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]);

  /** Handles signup accross the site.
   *
   * Automatically logs them in by setting the token upon signup.
   */
  async function register(userData) {
    try {
      let token = await WeatherApi.registerUser(userData);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("signup failed", errors)
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.*/
  async function login(loginData) {
    try {
      let token = await WeatherApi.loginUser(loginData);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /**Handles site-wide logout */
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <NavBar logout={logout} />
          <main>
            <Routes register={register} login={login} />
          </main>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
